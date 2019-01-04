import NotFoundPage from '../../../components/common/NotFoundPage';

describe('<NotFoundPage /> component', () => {
  const shallowWrapper = shallow(<NotFoundPage />);

  it('renders the header component without crashing', () => {
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});