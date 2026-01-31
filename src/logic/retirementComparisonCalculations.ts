export interface RetirementComparisonInput {
    annualContribution: number;
    currentTaxRate: number;
    retirementTaxRate: number;
    yearsUntilRetirement: number;
}

export interface RetirementComparisonResult {
    traditional401kNetValue: number;
    rothNetValue: number;
    differenceAtRetirement: number;
    traditional401kGrossValue: number;
    rothGrossValue: number;
    traditionalTaxesPaid: number;
    rothTaxesPaid: number;
    totalContributions: number;
    traditionalContributionPerYear: number;
    rothContributionPerYear: number;
    betterOption: 'traditional' | 'roth' | 'equal';
    annualContribution: number;
    currentTaxRate: number;
    retirementTaxRate: number;
    yearsUntilRetirement: number;
    message: string;
}

export function calculateRetirementComparison(input: RetirementComparisonInput): RetirementComparisonResult {
    const { annualContribution, currentTaxRate, retirementTaxRate, yearsUntilRetirement } = input;

    // Assumed annual return rate (7% is a common assumption for long-term stock market returns)
    const annualReturnRate = 0.07;

    // Traditional 401(k): Contribute pre-tax, pay taxes at retirement
    // The full contribution goes in pre-tax
    const traditionalContributionPerYear = annualContribution;

    // Roth: Contribute after-tax (so you contribute less actual dollars)
    // With the same gross contribution, you'd have less going into Roth after taxes
    const rothContributionPerYear = annualContribution * (1 - currentTaxRate / 100);

    // Calculate future value using compound interest formula: FV = PMT × ((1 + r)^n - 1) / r
    // This is the future value of an ordinary annuity
    const calculateFutureValue = (annualPayment: number, years: number, rate: number): number => {
        if (rate === 0) return annualPayment * years;
        return annualPayment * ((Math.pow(1 + rate, years) - 1) / rate);
    };

    // Traditional 401(k) grows tax-deferred
    const traditional401kGrossValue = calculateFutureValue(traditionalContributionPerYear, yearsUntilRetirement, annualReturnRate);
    // Taxes paid at withdrawal at retirement rate
    const traditionalTaxesPaid = traditional401kGrossValue * (retirementTaxRate / 100);
    const traditional401kNetValue = traditional401kGrossValue - traditionalTaxesPaid;

    // Roth grows tax-free (already paid taxes upfront)
    const rothGrossValue = calculateFutureValue(rothContributionPerYear, yearsUntilRetirement, annualReturnRate);
    // Taxes were paid upfront on the contributions
    const rothTaxesPaid = annualContribution * (currentTaxRate / 100) * yearsUntilRetirement;
    const rothNetValue = rothGrossValue; // No taxes at withdrawal

    // Calculate difference
    const differenceAtRetirement = traditional401kNetValue - rothNetValue;

    // Determine better option
    let betterOption: 'traditional' | 'roth' | 'equal';
    if (Math.abs(differenceAtRetirement) < 100) {
        betterOption = 'equal';
    } else if (differenceAtRetirement > 0) {
        betterOption = 'traditional';
    } else {
        betterOption = 'roth';
    }

    // Total contributions made
    const totalContributions = annualContribution * yearsUntilRetirement;

    // Generate message
    let message = '';
    if (betterOption === 'equal') {
        message = 'Both options show similar estimated outcomes';
    } else if (betterOption === 'traditional') {
        message = `Traditional 401(k) may yield ~$${Math.abs(differenceAtRetirement).toLocaleString('en-US', { maximumFractionDigits: 0 })} more`;
    } else {
        message = `Roth may yield ~$${Math.abs(differenceAtRetirement).toLocaleString('en-US', { maximumFractionDigits: 0 })} more`;
    }

    return {
        traditional401kNetValue,
        rothNetValue,
        differenceAtRetirement,
        traditional401kGrossValue,
        rothGrossValue,
        traditionalTaxesPaid,
        rothTaxesPaid,
        totalContributions,
        traditionalContributionPerYear,
        rothContributionPerYear,
        betterOption,
        annualContribution,
        currentTaxRate,
        retirementTaxRate,
        yearsUntilRetirement,
        message
    };
}
