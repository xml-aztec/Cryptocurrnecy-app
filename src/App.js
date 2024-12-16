import React, { useState, useEffect } from "react";
import Heading from "./components/Heading";
import Button from "./components/Buttons";
import Input from "./components/Input";
import Accordion from "./components/Accordion";
import Typography from "./components/Typography";
import Tooltip from "./components/Tooltip";
import "./App.css";

const App = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchCryptos = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.coinlore.net/api/tickers/");
      if (!response.ok) {
        throw new Error("Ошибка при загрузке данных");
      }
      const data = await response.json();
      setCryptos(data.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredCryptos = cryptos.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(search.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchCryptos();
  }, []);

  if (loading)
    return (
      <img
        className="loading"
        src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif"
        alt="loading"
      />
    );
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className="main-container">
      <div className="block">
        <div className="header">
          <Heading level="1" className="h1">
            Cryptocurrency Prices
          </Heading>
          <Button
            className="btn-update"
            size="md"
            variant="bordered"
            onClick={fetchCryptos}
          >
            Update
          </Button>
          <Input placeholder="Search" value={search} onChange={setSearch} />
        </div>
        {filteredCryptos.length > 0 ? (
          filteredCryptos.map((crypto) => (
            <Accordion key={crypto.id} title={`${crypto.name}`}>
              <Typography textSize="md">
                <b>Symbol</b>: {crypto.symbol}
              </Typography>
              <Typography textSize="md">
                <b>Price USD</b>: {crypto.price_usd}
              </Typography>
              <Typography textSize="md">
                <b>Price BTC</b>: {crypto.price_btc}
              </Typography>
              <Typography textSize="md">
                <Tooltip text="The market capitalization of a cryptocurrency is calculated by multiplying the number of coins in circulation by the current price.">
                  <span>
                    <b>Market Cap USD</b>: {crypto.market_cap_usd}
                  </span>
                </Tooltip>
              </Typography>
              <Typography textSize="md">
                <b>Percent Change 24H: </b>
                <span
                  style={{
                    color: crypto.percent_change_24h >= 0 ? "green" : "red",
                  }}
                >
                  {crypto.percent_change_24h}%
                </span>
              </Typography>
            </Accordion>
          ))
        ) : (
          <div className="no-cryptos">
            <Typography textSize="md">No cryptocurrencies found</Typography>
            <img
              className="ops"
              src="https://cdn.dribbble.com/users/406903/screenshots/6723682/drawkit-grape-pack-illustration-3-dribbble-export-v0.1.gif"
              alt="no-cryptos"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
