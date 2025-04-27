import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './AvaliacaoModal.module.css';

const avaliacaoSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  nota: z.number().min(1).max(5),
  titulo: z.string().min(5, 'Título deve ter pelo menos 5 caracteres'),
  comentario: z.string().min(10, 'Comentário deve ter pelo menos 10 caracteres')
});

const AvaliacaoModal = ({ isOpen, onClose, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(avaliacaoSchema)
  });

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await onSubmit({
        ...data,
        data: new Date().toISOString()
      });
      reset();
      onClose();
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modalContent}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Avaliar Produto</h2>
            <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  id="nome"
                  {...register('nome')}
                  className={errors.nome ? styles.inputError : ''}
                />
                {errors.nome && (
                  <span className={styles.errorMessage}>{errors.nome.message}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className={errors.email ? styles.inputError : ''}
                />
                {errors.email && (
                  <span className={styles.errorMessage}>{errors.email.message}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>Avaliação</label>
                <div className={styles.notaContainer}>
                  {[1, 2, 3, 4, 5].map((nota) => (
                    <label key={nota} className={styles.notaLabel}>
                      <input
                        type="radio"
                        value={nota}
                        {...register('nota')}
                        className={styles.notaInput}
                      />
                      <span className={styles.estrela}>
                        {nota <= register('nota').value ? '★' : '☆'}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.nota && (
                  <span className={styles.errorMessage}>{errors.nota.message}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="titulo">Título da Avaliação</label>
                <input
                  type="text"
                  id="titulo"
                  {...register('titulo')}
                  className={errors.titulo ? styles.inputError : ''}
                />
                {errors.titulo && (
                  <span className={styles.errorMessage}>{errors.titulo.message}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="comentario">Comentário</label>
                <textarea
                  id="comentario"
                  {...register('comentario')}
                  className={errors.comentario ? styles.inputError : ''}
                  rows="4"
                />
                {errors.comentario && (
                  <span className={styles.errorMessage}>
                    {errors.comentario.message}
                  </span>
                )}
              </div>

              <div className={styles.buttonContainer}>
                <button
                  type="button"
                  onClick={onClose}
                  className={styles.cancelButton}
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AvaliacaoModal; 