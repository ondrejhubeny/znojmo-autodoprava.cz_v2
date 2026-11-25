import React from 'react';
import { Award, ShieldCheck, Car, Clock } from 'lucide-react';
import { useLanguage } from '../i18n';

const STAT_ICONS = [
  <Award size={26} className="stat-icon-gold" />,
  <ShieldCheck size={26} className="stat-icon-gold" />,
  <Car size={26} className="stat-icon-gold" />,
  <Clock size={26} className="stat-icon-gold" />,
];

export const StatsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {t.stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon-wrapper">{STAT_ICONS[index]}</div>
              <div className="stat-body">
                <span className="stat-value">{stat.value}</span>
                <h4 className="stat-title">{stat.title}</h4>
                <p className="stat-desc">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
