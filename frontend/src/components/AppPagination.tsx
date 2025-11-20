import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const AppPagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  // Nếu chỉ có 1 trang hoặc không có dữ liệu -> Ẩn luôn cho gọn
  if (totalPages <= 1) return null;

  // Hàm xử lý click (chặn reload trang)
  const handlePageChange = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Logic tạo danh sách trang cần hiển thị (VD: 1 ... 4 5 6 ... 20)
  const generatePages = () => {
    const pages: (number | string)[] = [];

    // Luôn thêm trang 1
    pages.push(1);

    // Thêm dấu ... đầu (nếu trang hiện tại > 3)
    if (currentPage > 3) pages.push("...");

    // Thêm các trang xung quanh trang hiện tại (trước 1, sau 1)
    // Math.max(2, ...) để đảm bảo không lặp lại trang 1
    // Math.min(totalPages - 1, ...) để đảm bảo không lặp lại trang cuối
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    // Thêm dấu ... cuối (nếu trang hiện tại cách xa trang cuối)
    if (currentPage < totalPages - 2) pages.push("...");

    // Luôn thêm trang cuối (nếu tổng > 1)
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Nút Previous */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => handlePageChange(e, currentPage - 1)}
            className={
              currentPage <= 1
                ? "pointer-events-none opacity-50" // Disable nếu ở trang 1
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        {/* Render các số trang */}
        {generatePages().map((page, index) => (
          <PaginationItem key={index}>
            {page === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                isActive={currentPage === page}
                onClick={(e) => handlePageChange(e, page as number)}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Nút Next */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => handlePageChange(e, currentPage + 1)}
            className={
              currentPage >= totalPages
                ? "pointer-events-none opacity-50" // Disable nếu ở trang cuối
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default AppPagination;
