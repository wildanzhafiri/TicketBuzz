import axiosInstance from './axiosInstance';

export interface OrderRequest {
  tickets: {
    ticket_id: number;
    quantity: number;
  }[];
}

export const createTicketOrder = async (data: OrderRequest): Promise<string> => {
  console.log('Token di axios:', localStorage.getItem('token'));
  const response = await axiosInstance.post('/ticket-orders', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data.snap_url;
};

export type OrderTab = 'upcoming' | 'past' | 'all';

interface TicketResponse {
  id: number;
  ticket_id: number;
  quantity: number;
  ticket: {
    id: number;
    name: string;
    price: number;
    concert: {
      id: number;
      name: string;
      concert_start: string;
      link_poster: string;
      venue: {
        name: string;
      };
    };
  };
}

interface OrderResponse {
  id: number;
  order_time: string;
  ticket_orders: TicketResponse[];
}

interface APIResponse {
  data: OrderResponse[];
  current_page: number;
  last_page: number;
}

export const getMyOrders = async (tab: OrderTab): Promise<{ orders: OrderResponse[] }> => {
  try {
    let page = 1;
    let lastPage = 1;
    let allOrders: OrderResponse[] = [];

    const params: any = {};
    if (tab === 'upcoming') params.past = 0;
    else if (tab === 'past') params.past = 1;

    do {
      const response = await axiosInstance.get<{ data: APIResponse }>('/orders/me', {
        params: { ...params, page },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const { data } = response.data;
      allOrders = allOrders.concat(data.data);
      lastPage = data.last_page;
      page++;
    } while (page <= lastPage);

    const sortedOrders = allOrders.sort((a, b) => new Date(b.order_time).getTime() - new Date(a.order_time).getTime());

    return { orders: sortedOrders };
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return { orders: [] };
  }
};
