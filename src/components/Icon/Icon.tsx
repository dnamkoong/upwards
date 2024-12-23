import { Search, Sort, Category, Favorite, FavoriteBorder } from '@mui/icons-material';

interface IconProps {
  type: 'Search' | 'Sort' | 'Category' | 'Favorite' | 'FavoriteBorder';
}

const Icon = ({ type }: IconProps) => {
  const icons = { Search, Sort, Category, Favorite, FavoriteBorder };

  const Icon = icons[type];

  return Icon
    ? <Icon fontSize='small' />
    : null;
};

export default Icon