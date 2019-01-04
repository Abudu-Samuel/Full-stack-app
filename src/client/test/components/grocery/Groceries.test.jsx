import { Groceries } from '../../../components/grocery/Groceries';

describe('<Groceries />', () => {
  const setup = () => {
    const props = {
      groceries: {
        isFetching: false,
        isProcessing: false,
        groceries: []
      },
      actions: {
        fetchAllGroceries: jest.fn(),
        addGrocery: jest.fn(() => Promise.resolve()),
        deleteGrocery: jest.fn(),
        purchaseOrDropGrocery: jest.fn()
      }
    };

    const state = {
      name: '',
      errors: {}
    };

    return {
      shallowWrapper: shallow(<Groceries {...props} />),
      props,
      state
    };
  };

  const event = {
    target: {
      name: 'Pawpaw'
    },
    preventDefault: jest.fn(),
    persist: jest.fn()
  };

  it('should render without crashing', () => {
    const { shallowWrapper } = setup();

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('should display `Adding...` as button value when `isProcessing` is set to true', () => {
    const { shallowWrapper, props } = setup();

    shallowWrapper.setProps({
      ...props,
      groceries: {
        ...props.groceries,
        isProcessing: true
      }
    });

    expect(shallowWrapper.find('button').text()).toEqual('Adding...');
  });

  it('call `componentDidMount` when mounted', () => {
    const { shallowWrapper } = setup();
    const cdmSpy = jest.spyOn(Groceries.prototype, 'componentDidMount');

    shallowWrapper.instance().componentDidMount();
    expect(cdmSpy).toHaveBeenCalled();
  });

  it('call handleChange method', () => {
    const { shallowWrapper } = setup();
    const handleChangeSpy = jest
      .spyOn(shallowWrapper.instance(), 'handleChange');

    shallowWrapper.instance().handleChange(event);

    expect(handleChangeSpy).toHaveBeenCalled();
  });

  it('call handleFocus method', () => {
    const { shallowWrapper } = setup();
    const handleFocusSpy = jest.spyOn(shallowWrapper.instance(), 'handleFocus');

    shallowWrapper.instance().handleFocus(event);

    expect(handleFocusSpy).toHaveBeenCalled();
  });

  it('call handleSubmit method', () => {
    const { shallowWrapper } = setup();
    const handleSubmitSpy = jest.spyOn(shallowWrapper.instance(), 'handleSubmit');
    shallowWrapper.instance().handleSubmit(event);

    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('should throw submit errors when name field is invalid', () => {
    const { shallowWrapper, state } = setup();

    const buttonClick = () => shallowWrapper.find('button').first().simulate('click', event);

    buttonClick();
    expect(shallowWrapper.instance().state.error).toEqual({
      name: 'A minimum of 3 characters is required'
    });

    shallowWrapper.setState({
      ...state, name: '123'
    });

    buttonClick();
    expect(shallowWrapper.instance().state.error).toEqual({
      name: 'field must only contain letters'
    });
  });
});