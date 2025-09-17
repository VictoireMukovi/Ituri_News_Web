import { Domain } from '../types';
import { Badge } from './ui/badge';

interface DomainBadgeProps {
  domain: Domain;
  className?: string;
}

const colorClasses = {
  emerald: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-300',
  rose: 'bg-rose-100 text-rose-800 hover:bg-rose-200 dark:bg-rose-900 dark:text-rose-300',
  indigo: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-300',
  slate: 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300',
  amber: 'bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900 dark:text-amber-300',
  purple: 'bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300',
};

export function DomainBadge({ domain, className }: DomainBadgeProps) {
  return (
    <Badge 
      variant="secondary" 
      className={`${colorClasses[domain.color]} ${className}`}
    >
      {domain.name}
    </Badge>
  );
}