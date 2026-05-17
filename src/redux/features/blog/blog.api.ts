import { baseApi } from '@/redux/baseApi';
import type { IResponse } from '@/types';
import type { IBlog, IBlogListItem, BlogStatus } from '@/types/blog.type';

type BlogListQuery = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
  sort?: string;
};

type BlogInput = {
  title: string;
  category: string;
  status: BlogStatus;
  featureImage: string;
  content: string;
  excerpt?: string;
};

type BlogListResponse = IResponse<IBlogListItem[]>;

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<IResponse<string[]>, void>({
      query: () => ({ url: '/blog/categories', method: 'GET' }),
      providesTags: ['BLOG'],
    }),

    getBlogs: builder.query<BlogListResponse, BlogListQuery>({
      query: (params = {}) => ({
        url: '/blog',
        method: 'GET',
        params: {
          page: params.page ?? 1,
          limit: params.limit ?? 10,
          ...(params.search ? { search: params.search } : {}),
          ...(params.category ? { category: params.category } : {}),
          ...(params.status ? { status: params.status } : {}),
          ...(params.sort ? { sort: params.sort } : {}),
        },
      }),
      transformResponse: (response: BlogListResponse) => response,
      providesTags: ['BLOG'],
    }),

    getBlogBySlug: builder.query<IResponse<IBlog>, string>({
      query: (slug) => ({
        url: `/blog/slug/${slug}`,
        method: 'GET',
      }),
      transformResponse: (response: IResponse<IBlog>) => response,
      providesTags: ['BLOG'],
    }),

    getBlogById: builder.query<IResponse<IBlog>, string>({
      query: (id) => ({
        url: `/blog/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: IResponse<IBlog>) => response,
      providesTags: ['BLOG'],
    }),

    createBlog: builder.mutation<IResponse<IBlog>, BlogInput>({
      query: (blogData) => ({
        url: '/blog/create',
        method: 'POST',
        data: blogData,
      }),
      invalidatesTags: ['BLOG'],
    }),

    updateBlog: builder.mutation<IResponse<IBlog>, { id: string; data: Partial<BlogInput> }>({
      query: ({ id, data }) => ({
        url: `/blog/${id}`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['BLOG'],
    }),

    deleteBlog: builder.mutation<IResponse<{ _id: string; title?: string }>, string>({
      query: (id) => ({
        url: `/blog/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BLOG'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetBlogsQuery,
  useGetBlogBySlugQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
