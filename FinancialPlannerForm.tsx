import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

// List of countries for the location dropdown
const countries = [
  "United States", "Canada", "United Kingdom", "Australia", "Germany", 
  "France", "Japan", "China", "India", "Brazil", "Mexico", "South Africa",
  "Italy", "Spain", "Netherlands", "Sweden", "Norway", "Singapore", "New Zealand"
];

interface ChildAge {
  id: number;
  age: string;
}

interface FormData {
  location: string;
  monthlyIncome: string;
  savings: string;
  numberOfChildren: string;
  childrenAges: ChildAge[];
}

interface FinancialPlannerFormProps {
  onSubmit: (data: FormData) => void;
}

export function FinancialPlannerForm({ onSubmit }: FinancialPlannerFormProps) {
  const [formData, setFormData] = useState<FormData>({
    location: '',
    monthlyIncome: '',
    savings: '',
    numberOfChildren: '0',
    childrenAges: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update children ages array when number of children changes
  useEffect(() => {
    const numChildren = parseInt(formData.numberOfChildren) || 0;
    
    if (numChildren === 0) {
      setFormData(prev => ({ ...prev, childrenAges: [] }));
      return;
    }

    // Adjust the childrenAges array based on the number of children
    if (numChildren > formData.childrenAges.length) {
      // Add more children
      const newChildrenAges = [...formData.childrenAges];
      for (let i = formData.childrenAges.length; i < numChildren; i++) {
        newChildrenAges.push({ id: i, age: '' });
      }
      setFormData(prev => ({ ...prev, childrenAges: newChildrenAges }));
    } else if (numChildren < formData.childrenAges.length) {
      // Remove excess children
      const newChildrenAges = formData.childrenAges.slice(0, numChildren);
      setFormData(prev => ({ ...prev, childrenAges: newChildrenAges }));
    }
  }, [formData.numberOfChildren]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleLocationChange = (value: string) => {
    setFormData(prev => ({ ...prev, location: value }));
    
    // Clear error when field is updated
    if (errors.location) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.location;
        return newErrors;
      });
    }
  };

  const handleChildAgeChange = (id: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      childrenAges: prev.childrenAges.map(child => 
        child.id === id ? { ...child, age: value } : child
      )
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.location) {
      newErrors.location = 'Location is required';
    }

    if (!formData.monthlyIncome) {
      newErrors.monthlyIncome = 'Monthly income is required';
    } else if (isNaN(Number(formData.monthlyIncome)) || Number(formData.monthlyIncome) < 0) {
      newErrors.monthlyIncome = 'Monthly income must be a positive number';
    }

    if (!formData.savings) {
      newErrors.savings = 'Savings amount is required';
    } else if (isNaN(Number(formData.savings)) || Number(formData.savings) < 0) {
      newErrors.savings = 'Savings must be a positive number';
    }

    if (!formData.numberOfChildren) {
      newErrors.numberOfChildren = 'Number of children is required';
    } else if (
      isNaN(Number(formData.numberOfChildren)) || 
      Number(formData.numberOfChildren) < 0 ||
      !Number.isInteger(Number(formData.numberOfChildren))
    ) {
      newErrors.numberOfChildren = 'Number of children must be a non-negative integer';
    }

    // Validate each child's age
    formData.childrenAges.forEach((child, index) => {
      if (!child.age) {
        newErrors[`childAge-${child.id}`] = `Age for child ${index + 1} is required`;
      } else if (isNaN(Number(child.age)) || Number(child.age) < 0 || Number(child.age) > 25) {
        newErrors[`childAge-${child.id}`] = `Age for child ${index + 1} must be between 0 and 25`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Family Financial Planner</CardTitle>
        <CardDescription className="text-center">
          Enter your details below to receive personalized financial planning advice
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select 
              value={formData.location} 
              onValueChange={handleLocationChange}
            >
              <SelectTrigger id="location" className={errors.location ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map(country => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyIncome">Monthly Income</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
              <Input
                id="monthlyIncome"
                name="monthlyIncome"
                type="number"
                placeholder="5000"
                value={formData.monthlyIncome}
                onChange={handleChange}
                className={`pl-7 ${errors.monthlyIncome ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.monthlyIncome && <p className="text-sm text-red-500">{errors.monthlyIncome}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="savings">Current Savings</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
              <Input
                id="savings"
                name="savings"
                type="number"
                placeholder="25000"
                value={formData.savings}
                onChange={handleChange}
                className={`pl-7 ${errors.savings ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.savings && <p className="text-sm text-red-500">{errors.savings}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="numberOfChildren">Number of Children</Label>
            <Input
              id="numberOfChildren"
              name="numberOfChildren"
              type="number"
              min="0"
              max="10"
              placeholder="2"
              value={formData.numberOfChildren}
              onChange={handleChange}
              className={errors.numberOfChildren ? 'border-red-500' : ''}
            />
            {errors.numberOfChildren && <p className="text-sm text-red-500">{errors.numberOfChildren}</p>}
          </div>

          {formData.childrenAges.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium">Children's Ages</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.childrenAges.map((child, index) => (
                  <div key={child.id} className="space-y-2">
                    <Label htmlFor={`childAge-${child.id}`}>Child {index + 1} Age</Label>
                    <Input
                      id={`childAge-${child.id}`}
                      type="number"
                      min="0"
                      max="25"
                      placeholder="5"
                      value={child.age}
                      onChange={(e) => handleChildAgeChange(child.id, e.target.value)}
                      className={errors[`childAge-${child.id}`] ? 'border-red-500' : ''}
                    />
                    {errors[`childAge-${child.id}`] && (
                      <p className="text-sm text-red-500">{errors[`childAge-${child.id}`]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button type="submit" className="w-full">Generate Financial Plan</Button>
        </form>
      </CardContent>
    </Card>
  );
}
