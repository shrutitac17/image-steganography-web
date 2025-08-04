import React, { useState } from 'react';
import axios from 'axios';

export default function StegoForm() {
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [decoded, setDecoded] = useState('');

  const handleEncode = async e => {
    e.preventDefault();
    if (!image || !msg) return alert('Image and message required');
    const fd = new FormData();
    fd.append('image', image);
    fd.append('message', msg);
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/encode', fd, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url; a.download = 'encoded.png'; document.body.appendChild(a); a.click(); a.remove();
    } catch (e) {
      alert('Encode error: ' + e.message);
    }
    setLoading(false);
  };

  const handleDecode = async () => {
    if (!image) return alert('Upload encoded image first');
    const fd = new FormData(); fd.append('image', image);
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/decode', fd);
      setDecoded(res.data.message);
    } catch (e) {
      alert('Decode error: ' + e.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleEncode}>
        <label>Image:</label>
        <input type="file" accept="image/png" onChange={e => setImage(e.target.files[0])} />
        <br />
        <label>Message:</label>
        <input type="text" value={msg} onChange={e => setMsg(e.target.value)} />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Encoding…' : 'Encode'}
        </button>
      </form>

      <hr />

      <button onClick={handleDecode} disabled={loading || !image}>
        {loading ? 'Decoding…' : 'Decode'}
      </button>

      {decoded && (
        <div>
          <h3>Decoded Message:</h3>
          <p>{decoded}</p>
        </div>
      )}
    </div>
  );
}
