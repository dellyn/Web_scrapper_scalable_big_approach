import { Preview } from '@storybook/react/types';
import './styles.module.scss';

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [
        { name: 'White', value: '#fff' },
        { name: 'Black', value: '#191919' },
        { name: 'Navy Blue', value: '#000d23' },

      ]
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
