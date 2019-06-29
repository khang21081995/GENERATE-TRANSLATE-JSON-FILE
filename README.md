# sailsJS-Get-Translate-Content-I18n

1. Mở file config.js để cấu hình các tham số
    - getTranslateDir : danh sách các folder gốc tool quét qua. Tool sẽ tự động đọc những file chứa trong folder gốc và cả những file trong các thư mục con để bóc tách dữ liệu
    - regexGetData: regex định nghĩa việc bắt đầu và kết thúc có cấu trúc dạng `/START(.*?)END/gi`,
    - languages: danh sách các ngôn ngữ cần dịch. Lưu ý: cần coppy file ngôn ngữ hiện có sẵn đã dịch dạng json (ví dụ: vi.json) vào thư mục `./lang/input` để tool tự bỏ qua những key dữ liệu đã được dịch từ trước 
2. Mở terminal gõ `node run.js`
3. Mở thư mục `./lang/output` lấy file kết quả rồi dịch thủ công và coppy đè lại file ngôn ngữ cần dịch