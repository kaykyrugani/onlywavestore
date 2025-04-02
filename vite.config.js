import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Isso permite que o Vite redirecione todas as requisições para index.html
    // para que o React Router possa lidar com as rotas no lado do cliente
    historyApiFallback: true,
  }
})
