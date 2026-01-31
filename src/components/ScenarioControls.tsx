import React from 'react';
import type { RetirementComparisonInput } from '../logic/retirementComparisonCalculations';

interface ScenarioControlsProps {
    values: RetirementComparisonInput;
    onChange: (field: keyof RetirementComparisonInput, value: number | boolean) => void;
}

export const ScenarioControls: React.FC<ScenarioControlsProps> = ({ values, onChange }) => {
    const contributionOptions = [
        { label: '$5k', value: 5000 },
        { label: '$10k', value: 10000 },
        { label: '$15k', value: 15000 },
        { label: '$23k', value: 23000 },
    ];

    const yearsOptions = [
        { label: '10 yrs', value: 10 },
        { label: '20 yrs', value: 20 },
        { label: '30 yrs', value: 30 },
        { label: '40 yrs', value: 40 },
    ];

    return (
        <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>Quick Adjustments</h3>

            {/* Contribution Quick Select */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ marginBottom: 'var(--space-2)' }}>Annual Contribution</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {contributionOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange('annualContribution', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.annualContribution === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.annualContribution === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.annualContribution === option.value ? '#fff' : 'var(--color-text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Years Quick Select */}
            <div>
                <label style={{ marginBottom: 'var(--space-2)' }}>Years to Retirement</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {yearsOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange('yearsUntilRetirement', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.yearsUntilRetirement === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.yearsUntilRetirement === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.yearsUntilRetirement === option.value ? '#fff' : 'var(--color-text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
