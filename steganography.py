import cv2
import numpy as np
import sys

MARKER = '<<<END>>>'

def to_bin(data):
    if isinstance(data, str):
        return ''.join(format(ord(c), '08b') for c in data)
    elif isinstance(data, (bytes, np.ndarray)):
        return [format(byte, '08b') for byte in data]
    elif isinstance(data, (int, np.uint8)):
        return format(data, '08b')
    else:
        raise TypeError("Unsupported data type.")

def encode(image_path, message):
    image = cv2.imread(image_path)
    if image is None:
        print("Image not found.")
        return

    message += MARKER
    binary_msg = to_bin(message)
    msg_len = len(binary_msg)

    data_index = 0
    for row in image:
        for pixel in row:
            for i in range(3):
                if data_index < msg_len:
                    bit = binary_msg[data_index]
                    pix_bin = to_bin(pixel[i])
                    pixel[i] = int(pix_bin[:-1] + bit, 2)
                    data_index += 1

    if data_index < msg_len:
        print("Message too long to encode.")
        return

    cv2.imwrite("encoded.png", image)
    print("Message encoded successfully.")

def decode(image_path):
    image = cv2.imread(image_path)
    if image is None:
        print("Image not found.")
        return

    binary_data = ""
    for row in image:
        for pixel in row:
            for i in range(3):
                binary_data += to_bin(pixel[i])[-1]

    bytes_ = [binary_data[i:i+8] for i in range(0, len(binary_data), 8)]
    decoded = ""
    for byte in bytes_:
        decoded += chr(int(byte, 2))
        if MARKER in decoded:
            decoded = decoded.replace(MARKER, '')
            break

    # Safe print: strip out any non-ASCII to avoid PowerShell errors
    safe = decoded.encode('ascii', errors='ignore').decode()
    print(safe)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage:")
        print("  python steganography.py encode <image> <message>")
        print("  python steganography.py decode <image>")
        sys.exit(1)

    cmd = sys.argv[1].lower()
    if cmd == "encode" and len(sys.argv) == 4:
        encode(sys.argv[2], sys.argv[3])
    elif cmd == "decode" and len(sys.argv) == 3:
        decode(sys.argv[2])
    else:
        print("Invalid arguments.")
        sys.exit(1)
