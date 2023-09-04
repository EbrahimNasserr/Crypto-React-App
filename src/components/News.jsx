import React, { useEffect, useState } from "react";
import { Card, Avatar, Typography, Select, Row, Col } from "antd";
import moment from "moment/moment";
import { useSelector, useDispatch } from "react-redux";
import { fetchNews } from "../services/CryptoNewsApi";
const { Text, Title } = Typography;
const { Option } = Select;

const demoImageUrl =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
  const dispatch = useDispatch();
  const cryptoNews = useSelector((state) => state.news.data);
  const cryptoList = useSelector((state) => state.coins.data);

  // console.log(cryptoNews);

  const [newsCategory, SetnewsCategory] = useState("");

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);
  return (
    <>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => SetnewsCategory(value)}
              filterOption={(input, option) =>
                option.children
                  .toLowerCase()
                  .indexOf(input.toLocaleLowerCase() >= 0)
              }
            >
              <Option value="CryptoCurrency">CryptoCurrency</Option>
              {cryptoList?.data?.coins?.map((coin) => (
                <Option value={coin.name}>{coin.name}</Option>
              ))}
            </Select>
          </Col>
        )}

        {cryptoNews?.value?.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.name}
                  </Title>
                  <img
                    style={{ maxHeight: "100px", maxWidth: "200px" }}
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImageUrl
                    }
                    alt="news"
                  />
                </div>
                <p>
                  {news.description > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={news.provider[0]?.image?.thumbnail?.contentUrl}
                      alt="news"
                    ></Avatar>
                    <Text className="provider-name">
                      {news.provider[0]?.name}
                    </Text>
                  </div>
                  <Text>
                    {moment(news.datePublished).startOf("ss").fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
