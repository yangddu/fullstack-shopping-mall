import { graphql } from 'msw';

const mock_products = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    imageUrl: `https://picsum.photos/id/${i}/200/150`,
    price: 50000,
    title: '임시상품${i+1}',
    description: `임시상세내용${i+1}`,
    createdAt: new Date(123412341234+(i*1000*60*60*10)).toString()
}));

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
          newData[id] = {
            ...newData[id],
            amount: ( newData[id].amount || 0 )+ 1,
          }
        } else {
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
      })
  ];