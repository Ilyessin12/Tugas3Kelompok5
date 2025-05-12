# Gunakan image Node.js versi 18 (cocok untuk Next.js)
FROM node:18-alpine

# Set direktori kerja di container
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Instal dependensi
RUN npm install

# Salin semua file proyek
COPY . .

# Build aplikasi Next.js untuk produksi
RUN npm run build

# Expose port Next.js (default: 3000)
EXPOSE 3000

# Jalankan aplikasi dalam mode produksi
CMD ["npm", "start"]