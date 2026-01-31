import React from 'react';

export const SEOText: React.FC = () => {
    return (
        <div className="card" style={{ background: '#F8FAFC' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                This 401(k) vs Roth calculator compares estimated retirement outcomes based on your tax rates
                and contribution levels. These figures are estimates only and assume a 7% annual return. Actual
                results will depend on market performance, tax law changes, and your specific financial situation.
                This calculator is for informational purposes and does not constitute financial or tax advice.
                Consult a qualified financial advisor for personalized guidance.
            </p>
        </div>
    );
};
