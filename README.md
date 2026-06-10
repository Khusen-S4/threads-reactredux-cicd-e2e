# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


// Alur Kerja :
// Masuk http://localhost:5173/
// main.jsx ke 
// <Provider store={store}>
  // <App />
// </Provider> sehingga authUser = null
// Kemudian App.jsx menentukan Halaman pada kode: if (!authUser) {
//   return <LoginPage />;
// } karena authUser === null maka tampil LoginPage

// Alur Login saat user interaksi
// user isi form di LoginPage.jsx pada kode dispatch(asyncSetAuthUser({ email, password })); Kemudian
// asyncSetAuthUser
//    ↓
// login API
//    ↓
// dapat token
//    ↓
// simpan ke localStorage
//    ↓
// getOwnProfile
//    ↓
// dispatch SET_AUTH_USER
kemudian Redux Update State authUser = { id, name, avatar, ... } yang sebelumnya null sekarang berisi User
kemudian Rerender App.jsx, karena state berubah maka kode : if (!authUser) ❌nilai sekarang False sehingga HomePage di tampilkan return <HomePage />;

Ringkasan Alur Besarnya :
User buka app
   ↓
App.jsx jalan
   ↓
authUser = null
   ↓
LoginPage tampil
   ↓
User login
   ↓
Redux set authUser
   ↓
App rerender
   ↓
HomePage tampil

Submission 2 Testing
Persiapan testing : 
- npm install -D vitest jsdom
- npm install -D @testing-library/react
- npm install -D @testing-library/jest-dom
- npm install -D @testing-library/user-event
Kemudian untuk E2E 
- npm install -D cypress

Kemudian testing Reducer : misal di states/authUser/reducer.js
- SET_AUTH_USER
harus mengembalikan authUser yang diberikan
- UNSET_AUTH_USER
harus mengembalikan null

di Package.json tambahkan :
    "test": "vitest",
    "test:run": "vitest run",
    "e2e": "cypress open"
1. Pengujian reducer
2. Pengujian Thunk Action
misal - asyncSetAuthUser
- login berhasil
harus memanggil dispatch dengan action SET_AUTH_USER
- login gagal
harus melempar error

Membuka cypress : npx cypress open

status project Anda saat ini adalah:

Kriteria 1 Terpenuhi
Testing :
✅ Minimal 2 pengujian Reducer
✅ Minimal 2 pengujian Thunk Function
✅ Minimal 2 pengujian React Component
✅ Minimal 1 pengujian End-to-End login
✅ Skenario pengujian ditulis pada setiap file test
Perintah yang Berjalan :
✅ npm test
✅ npm run test:run
✅ npm run e2e
✅ npm run lint
✅ npm run build

    "lint": "eslint .", untuk kerapihan standard penulisan
    "test": "vitest", untuk watch test unit reducer dan thunk action
    "test:run": "vitest run", untuk test unit reducer dan thunk action
    "e2e": "cypress run", untuk End 2 End testing misal cypress/e2e/login.cy.js
    "e2e:open": "cypress open" untuk membuka cypress End 2 End dan membuat E2E

Tahap Kriteria 2
Tahap A - Continuous Integration (GitHub Actions)
   Target:

      Push ke GitHub
            ↓
      GitHub Actions berjalan
            ↓
      npm test
            ↓
      npm run e2e
            ↓
      PASS / FAIL

   Bukti:
      screenshot CI gagal
      screenshot CI berhasil


Tahap B - Continuous Deployment (Vercel)
Target:
   Push ke branch main
         ↓
   Vercel deploy otomatis
         ↓
   URL aplikasi aktif

Bukti:
   URL Vercel


Tahap C - Branch Protection
Target:
   main branch tidak boleh langsung di-push

   Harus melalui:

   Branch feature
         ↓
   Pull Request
         ↓
   CI harus PASS
         ↓
   Baru bisa merge

Bukti:
   screenshot branch protection


Tahap D 
   Melampirkan URL Vercel aplikasi Anda pada catatan submission


Pengerjaan Tahap Kriteria 2
Tahap A 
   Masuk ke GitHub dan buat repository baru :
      Nama yang saya sarankan:
         threads-reactredux-cicd-e2e
      Pengaturan:
         Public
   git add .
   git commit -m "initial commit"
   git remote add origin https://github.com/Khusen-S4/threads-reactredux-cicd-e2e.git
   git push -u origin main

   git remote -v
   git log --oneline -1

   Setelah push berhasil
      Baru kita masuk ke bagian yang benar-benar memenuhi kriteria deployment:
      Continuous Integration
      Membuat:
         .github/
         └── workflows/
            └── ci.yml dan mengisi kode CI disini
   
   git add .
   git commit -m "add github actions workflow"
   git push origin main

   npm install untuk membaca package.json dan memperbarui package-lock.json dan menyinkronkan dependency

   git status untuk melihat status perubahan kode misal -> modified: package-lock.json

   git add package-lock.json


Apa yang Terjadi di GitHub?
Bayangkan GitHub menyewa komputer Linux sementara untuk project Anda.

Kode ini:
jobs:
  test:
    runs-on: ubuntu-latest

artinya:
Buat mesin virtual Ubuntu terbaru
Lalu jalankan job bernama "test"

Visualnya:
GitHub
   ↓
Membuat Ubuntu VM
   ↓
Menjalankan langkah-langkah CI
   ↓
Menghapus VM setelah selesai

Jadi setiap push:
Ubuntu baru
↓
Jalankan workflow
↓
Hapus Ubuntu

Tidak ada yang disimpan dari workflow sebelumnya

Persiapan CI CD :
Login vercel 