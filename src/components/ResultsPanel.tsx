import React from 'react';
import type { RetirementComparisonResult } from '../logic/retirementComparisonCalculations';

interface ResultsPanelProps {
    result: RetirementComparisonResult;
}

const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(val);
};

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ result }) => {
    return (
        <div className="card" style={{
            background: 'linear-gradient(to bottom, #F0FDF4, #DCFCE7)',
            borderColor: '#86EFAC',
            boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.1)'
        }}>
            <div className="text-center">
                <h2 style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
                    Estimated 401(k) Net Value
                </h2>
                <div style={{
                    fontSize: '2.75rem',
                    fontWeight: 800,
                    color: '#166534',
                    lineHeight: 1,
                    letterSpacing: '-0.025em'
                }}>
                    {formatCurrency(result.traditional401kNetValue)}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
                    {result.message}
                </div>
            </div>

            <hr style={{
                margin: 'var(--space-6) 0',
                border: 'none',
                borderTop: '1px solid #86EFAC'
            }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-2)', textAlign: 'center' }}>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>ROTH NET VALUE</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem', color: '#166534' }}>
                        {formatCurrency(result.rothNetValue)}
                    </div>
                </div>
                <div style={{ borderLeft: '1px solid #86EFAC', borderRight: '1px solid #86EFAC' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>DIFFERENCE</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>
                        {result.differenceAtRetirement >= 0 ? '+' : ''}{formatCurrency(result.differenceAtRetirement)}
                    </div>
                </div>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>CONTRIBUTIONS</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>
                        {formatCurrency(result.totalContributions)}
                    </div>
                </div>
            </div>
        </div>
    );
};
