/**
 * Cria uma versão com debounce de uma função.
 * A função com debounce só será executada após o tempo especificado
 * ter passado desde a última vez que foi invocada.
 * 
 * @param {Function} func - A função a ser executada com debounce
 * @param {number} wait - O tempo de espera em milissegundos
 * @param {boolean} immediate - Se a função deve ser executada imediatamente
 * @returns {Function} - A função com debounce
 */
export const debounce = (func, wait, immediate = false) => {
  let timeout;
  
  return function executedFunction(...args) {
    const context = this;
    
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    
    const callNow = immediate && !timeout;
    
    clearTimeout(timeout);
    
    timeout = setTimeout(later, wait);
    
    if (callNow) func.apply(context, args);
  };
};
