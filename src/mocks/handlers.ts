import { graphql } from 'msw';

const mock_products = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    imageUrl: `https://picsum.photos/id/${i}/200/150`,
    price: 50000,
    title: `임시상품${i+1}`,
    description: `임시상세내용${i+1}`,
    createdAt: new Date(123412341234+(i*1000*60*60*10)).toString()
}));

let mock_posts = Array.from({ length: 10 }).map((_, i) => {
    const createdAt = new Date(123412341234+(i*1000*60*60*10)).toString();
    return {
        id: i,
        imageUrl: `https://picsum.photos/seed/${i}/200/150`,
        price: 10000,
        title: `요청상품${i+1}`,
        description: `요청내용${i+1}`,
        createdAt,
        updatedAt: ''
    }
});

let cartData: { [key: string] } = {};

export const handlers = [
    graphql.query('GET_PRODUCTS', (req, res, ctx): any => {
      return res(
        ctx.data({
          products: mock_products,
        })
      );
    }),
    graphql.query('GET_PRODUCT', (req, res, ctx): any => {
        const { id } = req.variables; // GraphQL 요청에서 id 추출
        const product = mock_products.find((p) => p.id === Number(id)); // 특정 ID의 제품 찾기
        return res(
            ctx.data({
                product
            })
        )
      }),
      graphql.query('GET_CART', (req, res, ctx): any => {
        return res(
          ctx.data(cartData)
        )
      }),

      graphql.mutation('ADD_CART', (req, res, ctx) => {
        const newData = { ...cartData };
        const id = req.variables.id;
        if (cartData[id]) {
            // 이미 장바구니에 있는 상품이면 개수 증가
          newData[id] = {
            ...newData[id],
            amount: ( newData[id].amount || 0 )+ 1,
          }
        } else {
            // 장바구니에 없는 상품이면 새로 추가
          const found = mock_products.find(item => item.id === (req.variables.id));
          if (found) {
            newData[id] = {
              ...found,
              amount: 1,
            }
          }
        }
        cartData = newData
        return res(
          ctx.data(newData)
        )
      }),

      graphql.query('GET_POSTS', (req, res, ctx) => {
        return res(
            ctx.data({
                posts: mock_posts,
            })
        )
      }),

      graphql.query('GET_POST', (req, res, ctx) => {
          const { id } = req.variables;
          const post = mock_posts.find((p) => p.id === Number(id)); // 특정 ID의 제품 찾기
          return res(
              ctx.data({
                  post
              })
          )
      }),

      graphql.mutation('CREATE_POST', (req, res, ctx) => {
        const { title, description, imageUrl, price } = req.variables;
        const newPost = {
          id: mock_posts.length,
          title,
          description,
          imageUrl: imageUrl || `https://picsum.photos/seed/${mock_posts.length}/200/150`,
          price: price || 10000,
          createdAt: new Date().toISOString(),
          updatedAt: ''
        };
        mock_posts.push(newPost);
        return res(
          ctx.data({
            post: newPost
          })
        )
      }),

      graphql.mutation('EDIT_POST', (req, res, ctx) => {
        const { id, title, description, imageUrl, price } = req.variables;
        const postIndex = mock_posts.findIndex((post) => post.id === Number(id));

        mock_posts[postIndex] = {
          ...mock_posts[postIndex],
          title: title || mock_posts[postIndex].title,
          description: description || mock_posts[postIndex].description,
          imageUrl: imageUrl || mock_posts[postIndex].imageUrl,
          price: price !== undefined ? price : mock_posts[postIndex].price,
          updatedAt: new Date().toISOString(),
        }
        
        return res(
          ctx.data({
            post: mock_posts[postIndex]
          })
        )
      })
  ];