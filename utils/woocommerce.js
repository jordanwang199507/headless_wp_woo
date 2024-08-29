import axios from "axios";

const woocommerce = axios.create({
  baseURL: "https://navajowhite-yak-294103.hostingersite.com/wp-json/wc/v3",
  auth: {
    username: process.env.CONSUMER_KEY,
    password: process.env.CONSUMER_SECRET,
  },
});

export default woocommerce;
