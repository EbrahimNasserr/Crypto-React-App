import React, { useEffect } from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { fetchExchanges } from "../services/exchangesApi";

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const coinExchanges = useSelector(
    (state) => state.ExchangesCoin.data?.data?.exchanges
  );
  // console.log(coinExchanges);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchExchanges());
  }, [dispatch]);

  if (!fetchExchanges) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {coinExchanges?.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.uuid}
                showArrow={false}
                header={
                  <Row key={exchange.uuid}>
                    <Col span={6}>
                      <Text>
                        <strong>{exchange.rank}.</strong>
                      </Text>
                      <Avatar
                        className="exchange-image"
                        src={exchange.iconUrl}
                      />
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                    <Col span={6}>${millify(exchange.price)}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange.price)}%</Col>
                  </Row>
                }
              >
                {HTMLReactParser(exchange.description || "")}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
