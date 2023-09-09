import React from 'react';
import { render } from '@testing-library/react';
import Delay from './Delay';

describe('<Delay />', () => {
    it('calculates positive delay', () => {
        const train = {
            AdvertisedTimeAtLocation: '2023-09-06T12:00:00Z',
            EstimatedTimeAtLocation: '2023-09-06T12:10:00Z',
        };

        const { getByText } = render(<Delay train={train} />);
        expect(getByText('10 minuter')).toBeInTheDocument();
    });

    it('shows zero delay', () => {
        const train = {
            AdvertisedTimeAtLocation: '2023-09-06T12:00:00Z',
            EstimatedTimeAtLocation: '2023-09-06T12:00:00Z',
        };

        const { getByText } = render(<Delay train={train} />);
        expect(getByText('0 minuter')).toBeInTheDocument();
    });
});
