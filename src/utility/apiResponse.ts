import { Response } from 'express';

/**
 * Standard success response format
 */
export const successResponse = (
  res: Response,
  data: any,
  message: string = 'Success',
  statusCode: number = 200,
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    [key: string]: any;
  }
) => {
  const response: any = {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };

  if (meta) {
    response.meta = meta;
  }

  return res.status(statusCode).json(response);
};

/**
 * Standard error response format (for use in controllers, not error handler)
 */
export const errorResponse = (
  res: Response,
  message: string,
  statusCode: number = 400,
  errors?: any[]
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors: errors || [],
    timestamp: new Date().toISOString(),
  });
};

/**
 * Standard pagination response
 */
export const paginatedResponse = (
  res: Response,
  data: any[],
  total: number,
  page: number,
  limit: number,
  message: string = 'Success'
) => {
  const totalPages = Math.ceil(total / limit);
  
  return successResponse(res, data, message, 200, {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  });
};