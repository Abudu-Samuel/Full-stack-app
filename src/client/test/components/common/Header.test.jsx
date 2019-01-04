import Header from '../../../components/common/Header';

describe('<Header /> component', () => {
  const shallowWrapper = shallow(<Header />);

  it('renders the header component without crashing', () => {
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('should have one child', () => {
    expect(shallowWrapper.find('.navbar-text').props().children).toHaveLength(12);

    expect(shallowWrapper.find('.navbar-text').props().children).toEqual('Grocery Shop');
  });
});