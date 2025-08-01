import { forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <Label 
          htmlFor={props.id} 
          className="text-sm font-medium text-foreground"
        >
          {label}
        </Label>
        <Input
          ref={ref}
          {...props}
          className={cn(
            "h-12 transition-all duration-300",
            "border-border/50 bg-muted/20 backdrop-blur-sm",
            "focus:border-primary focus:ring-primary focus:bg-muted/30",
            "hover:border-border hover:bg-muted/25",
            error && "border-destructive focus:border-destructive focus:ring-destructive",
            className
          )}
        />
        {error && (
          <p className="text-sm text-destructive animate-fade-in">
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';