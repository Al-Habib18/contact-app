/** @format */

import defaults from "../config/defaults";

interface Pagination {
    page: number;
    limit: number;
    totalItems: number;
    totalPage: number;
    next?: number;
    prev?: number;
}

const getPagination = ({
    totalItems = 0,
    limit = defaults.limit,
    page = defaults.page,
}): Pagination => {
    const totalPage = Math.ceil(totalItems / limit);
    const pagination: Pagination = {
        page,
        limit,
        totalItems,
        totalPage,
    };

    if (page < totalPage) {
        pagination.next = page + 1;
    }

    if (page > 1) {
        pagination.prev = page - 1;
    }

    return pagination;
};

export default getPagination;
