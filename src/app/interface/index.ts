export interface ICategory {
  name: string;
  color: string;
  _id: string;
}

export interface IArticle {
  _id: string;
  title: string;
  category: {
    name: string;
  };
  content: string;
  createTime: string;
  updateTime: string;
  uploads: { name: string; url: string }[];
}

export interface ISearchMap {
  category: string;
  title: string;
  start: string;
  end: string;
}