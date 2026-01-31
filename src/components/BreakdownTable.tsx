import React from 'react';
import type { RetirementComparisonResult } from '../logic/retirementComparisonCalculations';

interface BreakdownTableProps {
    result: RetirementComparisonResult;
}

const formatMoney = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(val);
};

export const BreakdownTable: React.FC<BreakdownTableProps> = ({ result }) => {
    const traditional401kRows = [
        { label: 'Total Contributions Made', value: formatMoney(result.totalContributions), isTotal: false },
        { label: 'Taxes Paid (at withdrawal)', value: formatMoney(result.traditionalTaxesPaid), isTotal: false },
        { label: 'Estimated Net Retirement Value', value: formatMoney(result.traditional401kNetValue), isTotal: true },
    ];

    const rothRows = [
        { label: 'Total Contributions Made', value: formatMoney(result.totalContributions), isTotal: false },
        { label: 'Taxes Paid (upfront)', value: formatMoney(result.rothTaxesPaid), isTotal: false },
        { label: 'Estimated Net Retirement Value', value: formatMoney(result.rothNetValue), isTotal: true },
    ];

    const renderTable = (rows: Array<{ label: string; value: string; isTotal: boolean }>, isLast = false) => (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
            <tbody>
                {rows.map((row, idx) => (
                    <tr key={idx} style={{
                        borderBottom: (isLast && idx === rows.length - 1) ? 'none' : '1px solid var(--color-border)',
                        backgroundColor: idx % 2 === 0 ? 'transparent' : '#F8FAFC'
                    }}>
                        <td style={{ padding: 'var(--space-3) var(--space-6)', color: 'var(--color-text-secondary)' }}>
                            {row.label}
                        </td>
                        <td style={{
                            padding: 'var(--space-3) var(--space-6)',
                            textAlign: 'right',
                            fontWeight: row.isTotal ? 700 : 400,
                            color: row.isTotal ? '#166534' : 'inherit'
                        }}>
                            {row.value}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className="card" style={{ padding: '0' }}>
            {/* Traditional 401(k) Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '1rem' }}>Traditional 401(k) Breakdown</h3>
            </div>
            {renderTable(traditional401kRows)}

            {/* Roth Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: '#F0FDF4' }}>
                <h3 style={{ fontSize: '1rem', color: '#166534' }}>Roth Breakdown</h3>
            </div>
            {renderTable(rothRows, true)}
        </div>
    );
};
