import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Contact } from "../models/contact.model";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  // tên của model có dính trong phương thức delete
  tagTypes: ["Contact"],
  endpoints: (builder) => ({
    contacts: builder.query<Contact[], void>({
      query: () => "/contacts",
      providesTags: ["Contact"],
    }),
    singleContact: builder.query<Contact, string>({
      // <Giá trị trả về, giá trị truyền vào>
      query: (id) => `/contacts/${id}`,
      providesTags: ["Contact"],
    }),
    addContacts: builder.mutation<{}, Contact>({
      query: (contact) => {
        const { id, ...body } = contact;
        return {
          url: "/contacts",
          method: "post",
          body,
        };
      },
      invalidatesTags: ["Contact"],
    }),
    deleteContact: builder.mutation<void, string>({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),
    updateContact: builder.mutation<void, Contact>({
      query: ({ id, ...body }) => ({
        url: `/contacts/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useContactsQuery,
  useSingleContactQuery,
  useAddContactsMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = contactApi;
