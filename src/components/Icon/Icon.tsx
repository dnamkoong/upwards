import { Search, Sort, Category } from '@mui/icons-material';

interface IconProps {
  type: 'Search' | 'Sort' | 'Category';
}

export const Icon = ({ type }: IconProps) => {
  const icons = { Search, Sort, Category };

  const Icon = icons[type];

  return Icon
    ? <Icon fontSize='small' />
    : null;
}