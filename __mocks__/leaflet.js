const leaflet = jest.genMockFromModule(`leaflet`);

leaflet.map = () => {
  return {
    setView: jest.fn(),
  };
};

leaflet.setView = () => {};

leaflet.tileLayer = () => {
  return {
    addTo: jest.fn(),
  };
};

leaflet.icon = () => {};

leaflet.marker = () => {
  return {
    addTo: jest.fn(),
  };
};

export default leaflet;
