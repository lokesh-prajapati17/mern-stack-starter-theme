import axiosInstance from "./AxiosService";

/**
 * Functional Base CRUD Service Factory (No Class syntax)
 * Creates a reusable CRUD service object for any API endpoint.
 *
 * Example usage:
 * const ProductService = createBaseService('/products');
 * export default ProductService;
 *
 * @param {string} endpoint - Base resource endpoint (e.g., '/users')
 */
export const createBaseService = (endpoint) => {
  return {
    /**
     * Get all items with optional query params
     * @param {object} params
     */
    getAll: (params = {}) => axiosInstance.get(endpoint, { params }),

    /**
     * Get single item by ID
     * @param {string|number} id
     */
    getById: (id) => axiosInstance.get(`${endpoint}/${id}`),

    /**
     * Create a new item
     * @param {object} data
     */
    create: (data) => axiosInstance.post(endpoint, data),

    /**
     * Update item by ID
     * @param {string|number} id
     * @param {object} data
     */
    update: (id, data) => axiosInstance.put(`${endpoint}/${id}`, data),

    /**
     * Partially update item by ID
     * @param {string|number} id
     * @param {object} data
     */
    patch: (id, data) => axiosInstance.patch(`${endpoint}/${id}`, data),

    /**
     * Delete item by ID
     * @param {string|number} id
     */
    delete: (id) => axiosInstance.delete(`${endpoint}/${id}`),
  };
};

export default createBaseService;
