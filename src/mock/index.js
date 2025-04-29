import Mock from "mockjs";
import book from "./data/book.json";

Mock.mock('/mock/books', {
  code: 200,
  data: book
});