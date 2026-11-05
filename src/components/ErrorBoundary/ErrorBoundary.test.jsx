import React from 'react';
import { describe, it, expect, vi, afterEach, afterAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

// 1. Tạo component con cố tình ném ra lỗi để test
const ThrowError = () => {
  throw new Error("Lỗi kiểm thử ErrorBoundary thành công!");
};

describe('ErrorBoundary Component', () => {
  // 2. Tắt tạm thời log lỗi đỏ của React trên terminal cho gọn
  const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  afterEach(() => {
    consoleErrorSpy.mockClear();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('phải bắt được lỗi từ component con và hiển thị giao diện Fallback UI', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    // 3. Kiểm tra các phần tử hiển thị trên màn hình giả lập
    const errorHeading = screen.getByText(/Đã xảy ra sự cố !/i);
    const errorMessage = screen.getByText(/Lỗi kiểm thử ErrorBoundary thành công!/i);

    expect(errorHeading).toBeDefined();
    expect(errorMessage).toBeDefined();
  });
});