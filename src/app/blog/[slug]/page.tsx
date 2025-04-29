import { graphConnect } from "@/lib/utils";
import { gql } from "graphql-request";
import Blog from "./components/blog";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
};

export interface IPost {
  excerpt: string;
  slug: string;
  title: string;
  id: string;
  date: string;
  content: {
    json: [];
  };
  coverImage: {
    url: string;
    width: number;
    height: number;
  };
  author: {
    name: string;
  };
}

interface IData {
  post: IPost;
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;

  const { post }: IData = await graphConnect.request(gql`
    {
      post(where: { slug: "${slug}" }) {
        excerpt
        slug
        title
        id
        date
        content {
          json
        }
        coverImage {
          url
          width
          height
        }
        author {
          name
        }
      }
    }
  `);

  return (
    <>
      <Blog post={post} />
    </>
  );
}
