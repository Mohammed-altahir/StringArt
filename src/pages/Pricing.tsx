import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Plan {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    popular: boolean;
}

interface PricingPageProps {}

export const PricingPage: React.FC<PricingPageProps> = () => {
    const navigate = useNavigate();
    const plans: Plan[] = [
        {
            name: 'Starter',
            price: '$9',
            period: '/month',
            description: 'Perfect for hobbyists and beginners',
            features: [
                'Up to 5 patterns/month',
                'Standard resolution',
                'Basic customization',
                'Email support'
            ],
            popular: false
        },
        {
            name: 'Pro',
            price: '$29',
            period: '/month',
            description: 'Best for creators and small studios',
            features: [
                'Up to 25 patterns/month',
                'High resolution exports',
                'Advanced customization',
                'Priority support',
                'Community sharing',
                'Pattern previews'
            ],
            popular: true
        },
        {
            name: 'Enterprise',
            price: '$99',
            period: '/month',
            description: 'For businesses and professional artists',
            features: [
                'Unlimited patterns',
                'Ultra high resolution',
                'Team collaboration',
                'Dedicated support',
                'Custom branding',
                'API access'
            ],
            popular: false
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Choose Your StringArt Plan
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Find the perfect plan for your creative journey. Upgrade or downgrade anytime.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative bg-slate-800 p-8 rounded-xl border transition-all duration-300 hover:scale-105 ${
                                plan.popular
                                    ? 'border-blue-500 ring-2 ring-blue-500/20'
                                    : 'border-slate-700 hover:border-slate-600'
                            }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                        Most Popular
                                    </span>
                                </div>
                            )}
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                <p className="text-slate-300 mb-4">{plan.description}</p>
                                <div className="flex items-baseline justify-center mb-4">
                                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                                    <span className="text-slate-400 ml-2">{plan.period}</span>
                                </div>
                            </div>
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center">
                                        <FaCheck className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                                        <span className="text-slate-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => navigate('/auth')}
                                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                                    plan.popular
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'bg-slate-700 hover:bg-slate-600 text-white'
                                }`}
                            >
                                Get Started
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

