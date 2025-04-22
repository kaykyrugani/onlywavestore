import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import './StatCard.css';

const StatCard = ({ title, value, icon: Icon, color, comparison }) => {
  return (
    <Card className="stat-card">
      <CardContent className="stat-card__content">
        <div className="stat-card__icon-container" style={{ backgroundColor: `${color}20` }}>
          <Icon className="stat-card__icon" style={{ color }} />
        </div>
        <div className="stat-card__info">
          <Typography variant="h4" className="stat-card__value">
            {value}
          </Typography>
          <Typography variant="body1" className="stat-card__title">
            {title}
          </Typography>
          {comparison && (
            <Box 
              className="stat-card__comparison"
              style={{ color: comparison.color }}
            >
              {comparison.icon}
              <Typography variant="body2" component="span">
                {comparison.value > 0 ? '+' : ''}{comparison.value.toFixed(1)}%
              </Typography>
            </Box>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard; 