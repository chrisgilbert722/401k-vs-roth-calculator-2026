import React from 'react';
import type { RetirementComparisonInput } from '../logic/retirementComparisonCalculations';

interface InputCardProps {
    values: RetirementComparisonInput;
    onChange: (field: keyof RetirementComparisonInput, value: number | boolean) => void;
}

export const InputCard: React.FC<InputCardProps> = ({ values, onChange }) => {
    return (
        <div className="card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {/* Annual Contribution */}
                <div>
                    <label htmlFor="annualContribution">Annual Contribution ($)</label>
                    <input
                        type="number"
                        id="annualContribution"
                        value={values.annualContribution}
                        onChange={(e) => onChange('annualContribution', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="500"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Amount you plan to contribute each year
                    </span>
                </div>

                {/* Current Tax Rate */}
                <div>
                    <label htmlFor="currentTaxRate">Current Tax Rate (%)</label>
                    <input
                        type="number"
                        id="currentTaxRate"
                        value={values.currentTaxRate}
                        onChange={(e) => onChange('currentTaxRate', parseFloat(e.target.value) || 0)}
                        min="0"
                        max="50"
                        step="1"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Your current marginal tax bracket
                    </span>
                </div>

                {/* Expected Retirement Tax Rate */}
                <div>
                    <label htmlFor="retirementTaxRate">Expected Retirement Tax Rate (%)</label>
                    <input
                        type="number"
                        id="retirementTaxRate"
                        value={values.retirementTaxRate}
                        onChange={(e) => onChange('retirementTaxRate', parseFloat(e.target.value) || 0)}
                        min="0"
                        max="50"
                        step="1"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Estimated tax rate when you withdraw in retirement
                    </span>
                </div>

                {/* Years Until Retirement */}
                <div>
                    <label htmlFor="yearsUntilRetirement">Years Until Retirement</label>
                    <input
                        type="number"
                        id="yearsUntilRetirement"
                        value={values.yearsUntilRetirement}
                        onChange={(e) => onChange('yearsUntilRetirement', parseFloat(e.target.value) || 0)}
                        min="1"
                        max="50"
                        step="1"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Number of years until you plan to retire
                    </span>
                </div>
            </div>
        </div>
    );
};
