interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishDate: string; 
  readTime: string;    
  category: string;
  tags: string[];
  image: string;
  views: number;
  likes: number;
}


const articles: Article[] = [{
    id: "1",
    title: "Đánh giá hiệu quả điều trị viêm gan B mạn tính bằng bài thuốc Long sài thang",
    slug: "long-sai-thang-dieu-tri-viem-gan-b-man-tinh",
    excerpt: "Nghiên cứu đánh giá hiệu quả điều trị viêm gan",
    content: `
    <h3 style="color: #2c3e50; font-size: 24px;  solid #3498db; padding-bottom: 5px; margin-top: 20px;">1. Mục tiêu nghiên cứu (Objectives)</h3>
<ul style="padding-left: 20px; font-size: 16px; color: #555; line-height: 1.6;">
    <li>Đánh giá hiệu quả điều trị viêm gan vi rút B mạn tính của bài thuốc “Long sài thang” trên lâm sàng.</li>
    <li>Ghi nhận tác dụng phụ và mức độ an toàn của thuốc.</li>
</ul>

<h3 style="color: #2c3e50; font-size: 24px; solid #3498db; padding-bottom: 5px; margin-top: 20px;">2. Phương pháp nghiên cứu (Methods)</h3>
<p style="font-size: 16px; color: #555; line-height: 1.6;">Nghiên cứu thử nghiệm lâm sàng ngẫu nhiên có đối chứng trên 60 bệnh nhân viêm gan B mạn tính (32 bệnh nhân nhóm điều trị và 28 bệnh nhân nhóm đối chứng) với 2 liệu trình, mỗi liệu trình kéo dài 3 tháng.</p>
<p style="font-size: 16px; color: #555; line-height: 1.6;">Tiêu chí đánh giá:</p>
<ul style="padding-left: 20px; font-size: 16px; color: #555; line-height: 1.6;">
    <li>Chỉ số men gan (ALT, AST)</li>
    <li>Triệu chứng lâm sàng (mệt mỏi, vàng da, ăn kém, đau tức hạ sườn, đau bụng, bụng chướng, buồn nôn,...)</li>
    <li>Tác dụng phụ và tác dụng không mong muốn trong quá trình điều trị</li>
</ul>
<p style="font-size: 16px; color: #555; line-height: 1.6;">Số liệu được xử lý theo các thuật toán thống kê y học sử dụng phần mềm SPSS 10.0.</p>

<h3 style="color: #2c3e50; font-size: 24px;  solid #3498db; padding-bottom: 5px; margin-top: 20px;">3. Kết quả (Results)</h3>
<p style="font-size: 16px; color: #555; line-height: 1.6;"><strong>Sau 1 liệu trình (3 tháng):</strong> Nhóm nghiên cứu có sự cải thiện rõ rệt các triệu chứng như mệt mỏi, ăn kém, đau tức hạ sườn, bụng chướng, nước tiểu vàng so với nhóm đối chứng (trừ triệu chứng nước tiểu vàng). Nhóm đối chứng cũng có cải thiện nhưng kém hơn.</p>

<p style="font-size: 16px; color: #555; line-height: 1.6;"><strong>Sau 2 liệu trình (6 tháng):</strong> Nhóm nghiên cứu cải thiện tất cả các triệu chứng: mệt mỏi, ăn kém, đau tức hạ sườn, bụng chướng, sợ mỡ, vàng da, nước tiểu vàng, với mức cải thiện rõ hơn so với nhóm đối chứng. Nhóm đối chứng cũng có cải thiện ở các triệu chứng trên nhưng ở mức thấp hơn.</p>

<p style="font-size: 16px; color: #555; line-height: 1.6;"><strong>Hiệu quả điều trị:</strong></p>
<ul style="padding-left: 20px; font-size: 16px; color: #555; line-height: 1.6;">
    <li>Nhóm nghiên cứu: điều trị khỏi 56,25%, có tác dụng 37,50%, không có tác dụng 6,25%, tổng hiệu quả đạt 93,75%</li>
    <li>Nhóm đối chứng: điều trị khỏi 14,29%, có tác dụng 46,43%, không có tác dụng 39,28%, tổng hiệu quả đạt 60,72%</li>
</ul>
<p style="font-size: 16px; color: #555; line-height: 1.6;">Sự khác biệt giữa hai nhóm có ý nghĩa thống kê với p &lt; 0.01.</p>
<p style="font-size: 16px; color: #555; line-height: 1.6;">Không ghi nhận tác dụng phụ hoặc tác dụng không mong muốn ở cả hai nhóm trong suốt quá trình điều trị.</p>

<h3 style="color: #2c3e50; font-size: 24px; solid #3498db; padding-bottom: 5px; margin-top: 20px;">4. Kết luận & Khuyến nghị (Conclusion)</h3>
<p style="font-size: 16px; color: #555; line-height: 1.6;">Bài thuốc “Long sài thang” dựa trên cơ sở lý luận y học cổ truyền đã mang lại hiệu quả khả quan trong điều trị viêm gan vi rút B mạn tính. Cần mở rộng nghiên cứu lâm sàng để đánh giá kỹ hơn trước khi đề xuất sử dụng làm bài thuốc cơ bản trong điều trị bệnh này.</p>

<h3 style="color: #2c3e50; font-size: 24px; solid #3498db; padding-bottom: 5px; margin-top: 20px;">Tài liệu tham khảo (References)</h3>
<ol style="font-size: 16px; color: #555; padding-left: 20px; line-height: 1.6;">
    <li>Arie J. Zuckerman, Howard C. Thomas. Viral hepatitis, second edition. Harcourt Asia Churchill Livingston, 2001:108.</li>
    <li>金实，周珉。病毒性肝炎中医治疗学。南京中医药大学、进修课教材，2001:9。</li>
    <li>Lê Quân Huấn. Bệnh viêm gan do vi rút. Nhà xuất bản Y học Hà Nội. 2000:37.</li>
    <li>王浴生、邓文龙、薛春生，中药药理与应用，第二版，人民卫生出版社，北京2000年:250。</li>
    <li>郑筱萸，任德权，等。中药新药临床研究指导原则（试行）。中国医药科技出版社，北京，2002:144-145。</li>
</ol>
<p style="font-size: 16px; color: #555; line-height: 1.6;"><strong>Tải bài nghiên cứu gốc:</strong> <a href="https://tapchiyhocvietnam.vn/index.php/vmj/article/view/8453/7470" target="_blank" style="color: #3498db; text-decoration: none;">Tại đây</a></p>
<p style="font-size: 16px; color: #555; line-height: 1.6;"><strong>DOI:</strong> <a href="https://doi.org/10.51298/vmj.v535i1B.8453" target="_blank" style="color: #3498db; text-decoration: none;">https://doi.org/10.51298/vmj.v535i1B.8453</a></p>
`,
    publishDate: "2024-03-01",
    readTime: "7 phút đọc",
    category: "Nghiên cứu lâm sàng",
    tags: ["Viêm gan B", "Đông y", "Long sài thang", "Nghiên cứu y học", "Thử nghiệm lâm sàng"],
    image: "/images/article/1.jpg", // bạn thay link ảnh thực tế nếu có
    views: 1490,
    likes: 113,

},
{
  id: "2",
  title: "Đánh giá kết quả của phương pháp nắn chỉnh cột sống kết hợp điện châm, hồng ngoại điều trị đau dây thần kinh tọa",
  slug: "danh-gia-nan-chinh-cot-song-dien-cham-hong-ngoai-dau-day-than-kinh-toa",
  excerpt: "Nghiên cứu đánh giá hiệu quả điều trị đau dây thần kinh tọa do thoái hóa cột sống bằng phương pháp nắn chỉnh cột sống kết hợp điện châm và hồng ngoại.",
  content: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <p><strong>Tác giả:</strong> Hoàng Minh Ngọc, Nguyễn Tiến Chung, Nguyễn Duy Đại, Trần Thế Hiệp</p>
  <p><strong>Đơn vị:</strong> BVĐK Hà Đông, Học viện Y-Dược học cổ truyền Việt Nam</p>
  <p><strong>Ngày xuất bản:</strong> 25/08/2024</p>
  <p><strong>Loại nghiên cứu:</strong> Can thiệp lâm sàng tiến cứu có đối chứng</p>

  <h3 style="color: #006699;">Mục tiêu nghiên cứu</h3>
  <p>Đánh giá kết quả của phương pháp nắn chỉnh cột sống kết hợp điện châm, hồng ngoại trong điều trị đau dây thần kinh tọa do thoái hóa cột sống.</p>

  <h3 style="color: #006699;">Phương pháp</h3>
  <p>60 bệnh nhân được chia làm hai nhóm:</p>
  <ul style="padding-left: 20px;">
    <li><strong>Nhóm nghiên cứu (30 bệnh nhân):</strong> Nắn chỉnh cột sống + điện châm + hồng ngoại</li>
    <li><strong>Nhóm đối chứng (30 bệnh nhân):</strong> Xoa bóp bấm huyệt + điện châm + hồng ngoại</li>
  </ul>
  <p>Lượng giá hiệu quả bằng chỉ số VAS, tầm vận động cột sống và hình ảnh X-quang tại các mốc D0, D5, D10, D15.</p>
  <p>Phân tích số liệu bằng phần mềm SPSS 20.0, sử dụng các phép kiểm định T-test và Chi-squared với mức ý nghĩa thống kê <span style="font-style: italic;">p &lt; 0.05</span>.</p>

  <h3 style="color: #006699;">Kết quả</h3>
  <p>Cả hai nhóm đều có cải thiện sau điều trị, tuy nhiên nhóm sử dụng phương pháp nắn chỉnh cột sống kết hợp điện châm và hồng ngoại cho kết quả vượt trội hơn.</p>

  <h3 style="color: #006699;">Kết luận</h3>
  <p>Phương pháp nắn chỉnh cột sống kết hợp với điện châm và chiếu đèn hồng ngoại có hiệu quả cao trong điều trị đau thần kinh tọa do thoái hóa cột sống, giúp giảm đau và cải thiện chức năng vận động cho bệnh nhân.</p>

  <p><strong>DOI:</strong> <a href="https://doi.org/10.60117/vjmap.v55i2.279" target="_blank" style="color: #006699; text-decoration: none;">https://doi.org/10.60117/vjmap.v55i2.279</a></p>
  <p><strong>Xem chi tiết:</strong> <a href="https://vjmap.vn/index.php/vjmap/article/view/279/241" target="_blank" style="color: #006699; text-decoration: none;">https://vjmap.vn/index.php/vjmap/article/view/279/241</a></p>
</div> `,
  publishDate: "2024-08-25",
  readTime: "6 phút",
  category: "Y học cổ truyền",
  tags: ["nắn chỉnh cột sống", "điện châm", "đau thần kinh tọa", "thoái hóa cột sống", "y học cổ truyền"],
  image: "/images/article/2.jpg", // bạn thay link ảnh thực tế nếu có
  views: 230,
  likes: 230
},
{
  id: "3",
  title: "Nghiên cứu tác dụng của bài thuốc Dưỡng cốt HV trên bệnh nhân đau thần kinh tọa do thoái hóa cột sống",
  slug: "nghien-cuu-tac-dung-bai-thuoc-duong-cot-hv",
  excerpt: "Đánh giá kết quả điều trị đau thần kinh tọa do thoái hóa cột sống thắt lưng bằng bài thuốc Dưỡng cốt HV kết hợp điện châm.",
  content: `
    <div style="max-width: 800px; margin: 20px auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px; font-family: Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9;">

  <p><strong>Tác giả:</strong> Nguyễn Danh Đạt, Nguyễn Tiến Chung</p>
  <p><strong>Đơn vị:</strong> Bệnh viện Y học cổ truyền Bộ Công an, Học viện Y - Dược học cổ truyền Việt Nam</p>
  <p><strong>Ngày xuất bản:</strong> 24/06/2024</p>
  <p><strong>Loại nghiên cứu:</strong> Can thiệp lâm sàng tiến cứu có đối chứng</p>
  <p><strong>Từ khóa:</strong> Đau thần kinh tọa, Dưỡng cốt HV, điện châm</p>

  <h3 style="margin-top: 30px;">Tóm tắt</h3>

  <h4>1. Mục tiêu nghiên cứu</h4>
  <p>Đánh giá kết quả điều trị đau thần kinh tọa do thoái hóa cột sống thắt lưng bằng bài thuốc Dưỡng cốt HV kết hợp điện châm.</p>

  <h4>2. Phương pháp nghiên cứu</h4>
  <p><strong>Đối tượng:</strong> 70 bệnh nhân ≥ 38 tuổi, không phân biệt giới tính, nghề nghiệp, được chẩn đoán xác định đau thần kinh tọa do thoái hóa cột sống thắt lưng, điều trị nội trú tại Bệnh viện Y học cổ truyền Bộ Công an.</p>
  <p><strong>Phương pháp:</strong> Nghiên cứu can thiệp lâm sàng tiến cứu, so sánh trước sau, có đối chứng.</p>
  <p><strong>Phân nhóm:</strong></p>
  <ul>
    <li><strong>Nhóm nghiên cứu (35 bệnh nhân):</strong> được điều trị bằng bài thuốc Dưỡng cốt HV kết hợp điện châm.</li>
    <li><strong>Nhóm đối chứng (35 bệnh nhân):</strong> được điều trị bằng bài thuốc Tam tý thang kết hợp điện châm.</li>
  </ul>
  <p><strong>Các chỉ số đánh giá:</strong></p>
  <ul>
    <li>Điểm đau theo thang VAS (Visual Analog Scale)</li>
    <li>Độ giãn cột sống thắt lưng qua nghiệm pháp Schober</li>
    <li>Mức độ chèn ép rễ thần kinh tọa bằng nghiệp pháp Lassegue</li>
    <li>Chức năng sinh hoạt hàng ngày theo chỉ số ODI (Oswestry Disability Index)</li>
  </ul>
  <p><strong>Xử lý và phân tích số liệu:</strong> Xử lý theo phương pháp thống kê Y sinh học với sự hỗ trợ của phần mềm SPSS 20.0.</p>

  <h4>3. Kết quả</h4>
  <p><strong>Sau 21 ngày điều trị:</strong></p>
  <ul>
    <li>Giảm đau theo VAS trung bình 67,7%.</li>
    <li>Cải thiện mức độ chèn ép rễ thần kinh: 88,5%.</li>
    <li>Cải thiện chức năng sinh hoạt (ODI): 79,41%.</li>
    <li>Tỷ lệ đạt kết quả “tốt” và “khá” trong nhóm Dưỡng cốt HV lần lượt 65,7% và 31,4% (xu hướng cải thiện hơn nhóm đối chứng).</li>
  </ul>

  <h4>4. Kết luận</h4>
  <p>Bài thuốc Dưỡng cốt HV kết hợp điện châm là phương pháp an toàn, cho hiệu quả giảm đau rõ rệt, cải thiện chức năng vận động và sinh hoạt hàng ngày ở bệnh nhân đau thần kinh tọa do thoái hóa cột sống thắt lưng (theo thể can thận hư kiêm phong hàn thấp trong YHCT).</p>

  <h3 style="margin-top: 30px;">Tài liệu tham khảo</h3>
  <ul>
    <li>Nguyễn Văn Đăng. Đau thần kinh hông. Bách khoa thư bệnh học, tập 1, Nhà xuất bản Y học, Hà Nội, 2008, tr.152-157.</li>
    <li>Bộ Y tế. Hướng dẫn chẩn đoán và điều trị các bệnh cơ xương khớp, Nhà xuất bản Y học, Hà Nội, 2018, tr.131-134, tr.140-144.</li>
    <li>Koes BW, Van Tulder MW, Peul WC. Diagnosis and treatment of sciatica. BMJ, 2007, 334(7607), pp.1313-1317.</li>
    <li>上海中医学院中医基础理论教研组编.中医方剂临床手册 “三痹汤” 上海人民出版社。1973, 196.</li>
    <li>Bộ Y tế. Quyết định về việc ban hành hướng dẫn quy trình kỹ thuật khám bệnh, chữa bệnh chuyên ngành châm cứu, Quyết định 792/QĐ-BYT, 2013.</li>
    <li>Nguyễn Tiến Chung, Ngô Thọ Huy, Nguyễn Hoàng Ngân. Đánh giá độc tính cấp và tác dụng giảm đau ngoại vi của bài thuốc Khớp gối HV trên động vật thực nghiệm. Tạp chí y dược cổ truyền Việt Nam, 2019, số 2 (21), tr.9-13.</li>
    <li>Phương, T. T. L., & Vũ, N. Đánh giá tác dụng điều trị đau thắt lưng do thoái hóa cột sống bằng sóng siêu âm kết hợp viên hoàn độc hoạt tang ký sinh. Tạp chí Y học Việt Nam, 2023, 523(1).</li>
  </ul>

  <p><strong>Tải về bài nghiên cứu gốc:</strong> <a href="https://vjmap.vn/index.php/vjmap/article/view/264/228" target="_blank">https://vjmap.vn/index.php/vjmap/article/view/264/228</a></p>
  <p><strong>DOI:</strong> <a href="https://doi.org/10.60117/vjmap.v54i01.264" target="_blank">https://doi.org/10.60117/vjmap.v54i01.264</a></p>

</div>`,
  publishDate: "2024-06-24",
  readTime: "5 phút",
  category: "Y học cổ truyền",
  tags: ["đau thần kinh tọa", "Dưỡng cốt HV", "điện châm", "thoái hóa cột sống", "y học cổ truyền"],
  image: "/images/article/3.jpg", // Bạn có thể thay đổi link ảnh nếu có
  views: 230,
  likes: 120
},{
id: "4",
  title: "CÔNG NĂNG, CHỦ TRỊ MỘT SỐ VỊ THUỐC NAM THƯỜNG DÙNG TẠI MIỀN BẮC VIỆT NAM",
  slug: "cong-nang-chu-tri-vu-thuoc-nam",
  excerpt: "Mô tả công năng, chủ trị của một số vị thuốc nam thường dùng tại miền Bắc Việt Nam.",
  content: `
    <h1 style="text-align:center; font-size: 24px; color: darkgreen;">CÔNG NĂNG, CHỦ TRỊ MỘT SỐ VỊ THUỐC NAM THƯỜNG DÙNG TẠI MIỀN BẮC VIỆT NAM</h1>

<p style="text-align:center;"><strong>Bùi Thị Phương</strong>, <strong>Nguyễn Tiến Chung</strong>, <strong>Phạm Vũ Khánh</strong></p>
<p style="text-align:center; font-style: italic;">Học viện Y - Dược học cổ truyền Việt Nam</p>
<p><strong>Ngày xuất bản:</strong> 24/06/2024</p>
<p><strong>Từ khóa:</strong> Công năng, chủ trị, thuốc nam</p>

<h2 style="color: darkblue;">Tóm tắt (Summary)</h2>

<h3 style="color: #2e6c80;">1. Mục tiêu nghiên cứu (Objectives)</h3>
<p>Mô tả công năng, chủ trị của một số vị thuốc nam thường dùng tại miền Bắc Việt Nam.</p>

<h3 style="color: #2e6c80;">2. Phương pháp nghiên cứu (Methods)</h3>
<p><strong>Đối tượng:</strong> 102 vị thuốc, lựa chọn theo phương pháp lấy mẫu thuận tiện.</p>
<p><strong>Phương pháp:</strong> Thống kê, đối sánh, luận suy kết hợp xin ý kiến đồng thuận chuyên gia.</p>
<p><strong>Xử lý và phân tích số liệu:</strong> Thống kê, phân tích và xử lý bằng phần mềm Microsoft Excel 2016 và SPSS 22.0. Sử dụng phương pháp thống kê mô tả, tính tỉ lệ % và mô tả, đối sánh công năng, chủ trị của các vị thuốc.</p>

<h3 style="color: #2e6c80;">3. Kết quả (Results)</h3>
<p>Nghiên cứu xác định được công năng chủ trị của 102 vị thuốc nam. Cụ thể:</p>
<ul style="line-height: 1.6;">
  <li><strong>17 vị thuốc</strong> có công năng, chủ trị bệnh Hô hấp (53% điều trị Đàm ẩm);</li>
  <li><strong>13 vị thuốc</strong> có công năng, chủ trị bệnh Tiêu hóa (23% điều trị Tiết tả);</li>
  <li><strong>23 vị thuốc</strong> có công năng chủ trị bệnh Tiết niệu - sinh dục (61% điều trị Lâm chứng);</li>
  <li><strong>21 vị thuốc</strong> có công năng, chủ trị bệnh Cơ xương khớp (90% điều trị chứng Tý);</li>
  <li><strong>9 vị thuốc</strong> có công năng, chủ trị bệnh Thần kinh - tâm thần (44% điều trị Thất miên);</li>
  <li><strong>19 vị thuốc</strong> có công năng, chủ trị bệnh khác (47% điều trị Viêm da...).</li>
</ul>

<h3 style="color: #2e6c80;">4. Kết luận (Conclusion)</h3>
<p>Mô tả được công năng chủ trị của 102 vị thuốc nam, nhóm bệnh thường tập trung vào 3 nhóm bệnh chính Tiết niệu – sinh dục; Cơ xương khớp và Hô hấp chiếm trên 60%.</p>

<h3 style="color: #2e6c80;">Tài liệu tham khảo (References)</h3>
<ul style="line-height: 1.6;">
  <li>Nguyễn Thượng Dong. <em>Nghiên cứu phát triển dược liệu và đông dược ở Việt Nam</em>, Nhà xuất bản Khoa học và Kỹ thuật, 2006.</li>
  <li>Viện Dược liệu. <em>Danh lục cây thuốc Việt Nam</em>, Nhà xuất bản Khoa học và kỹ thuật, Hà Nội, 2016.</li>
  <li>Nguyễn Công Đức. <em>Thuốc nam trị bệnh</em>, Nhà xuất bản Thanh niên, TP. Hồ Chí Minh, 2022.</li>
  <li>Bộ môn Nội, Học viện Y-Dược học cổ truyền Việt Nam. <em>Bài giảng bệnh học nội khoa</em>, Nhà xuất bản Y học, Hà Nội, 2015.</li>
  <li>Nguyễn Viết Thân. <em>Cây thuốc Việt Nam và những bài thuốc thường dùng</em>, Tập 1, Nhà xuất bản Y Học, Hà Nội, 2020.</li>
  <li>Đỗ Tất Lợi. <em>Cây thuốc và vị thuốc Việt Nam</em>, Nhà xuất bản Y học, Hà Nội, 2004.</li>
</ul>

<h3 style="color: #2e6c80;">Tải về bài nghiên cứu gốc</h3>
<p><a href="https://vjmap.vn/index.php/vjmap/article/view/269/233" target="_blank" style="color: darkred;">https://vjmap.vn/index.php/vjmap/article/view/269/233</a></p>
<p><strong>DOI:</strong> <a href="https://doi.org/10.60117/vjmap.v54i01.269" target="_blank" style="color: darkred;">https://doi.org/10.60117/vjmap.v54i01.269</a></p>`,
  publishDate: "24/06/2024",
  readTime: "8 phút",
  category: "Y học cổ truyền",
  tags: ["Thuốc nam", "Công năng", "Chủ trị", "Miền Bắc"],
  image: "/images/article/4.jpg",
  views: 1250,
  likes: 500
},
{
  id: "5",
  title: "NGHIÊN CỨU GIÁ TRỊ CỦA PHƯƠNG PHÁP MỤC CHẨN TRONG CHẨN ĐOÁN ĐAU VAI GÁY DO THOÁI HOÁ CỘT SỐNG CỔ",
  slug: "nghien-cuu-gia-tri-phuong-phap-muc-chan-dau-vai-gay",
  excerpt: "Nghiên cứu giá trị của phương pháp mục chẩn trong chẩn đoán đau vai gáy do thoái hóa cột sống cổ.",
  content: `
    <h1 style="font-size: 28px; font-weight: bold; color: #2c3e50;">NGHIÊN CỨU GIÁ TRỊ CỦA PHƯƠNG PHÁP MỤC CHẨN TRONG CHẨN ĐOÁN ĐAU VAI GÁY DO THOÁI HOÁ CỘT SỐNG CỔ</h1>

<p style="font-weight: bold; margin-bottom: 4px;">Đoàn Văn Minh, Nguyễn Thị Kim Liên, Nguyễn Quang Tâm, Trương Hữu Thiện Tri, Nguyễn Văn Hưng, Nguyễn Thị Hương Lam</p>
<p style="font-style: italic; margin: 2px 0;">Trường Đại học Y - Dược, Đại học Huế</p>
<p style="font-style: italic; margin: 2px 0 12px;">Phòng khám Đa khoa Tuệ Tĩnh Đường Hải Đức, Thành phố Huế</p>
<p style="font-weight: bold; margin: 6px 0;"><strong>Ngày xuất bản:</strong> 30/08/2023</p>
<p style="margin: 6px 0;"><strong>Từ khóa:</strong> Mục chẩn, độ nhạy, độ đặc hiệu, đau vai gáy.</p>

<h2 style="color: #34495e; font-size: 22px;">Tóm tắt (Summary)</h2>

<h3 style="color: #2c3e50; font-size: 18px;">1. Mục tiêu nghiên cứu (Objectives)</h3>
<p style="text-align: justify;">Mô tả đặc điểm mạch máu củng mạc mắt ở vị trí 12 giờ và nghiên cứu độ nhạy, độ đặc hiệu của phương pháp mục chẩn trong chẩn đoán đau vai gáy do thoái hóa cột sống cổ.</p>

<h3 style="color: #2c3e50; font-size: 18px;">2. Phương pháp nghiên cứu (Methods)</h3>
<p><strong>Đối tượng:</strong> 281 bệnh nhân được chẩn đoán đau vai gáy tại Bệnh viện Y học cổ truyền tỉnh Thừa Thiên Huế, Khoa Y học cổ truyền-Bệnh viện Trung Ương Huế và Bệnh viện Trường Đại học Y - Dược Huế.</p>
<p><strong>Phương pháp:</strong> Mô tả cắt ngang.</p>
<p><strong>Xử lý và phân tích số liệu:</strong> Số liệu được phân tích và xử lý bằng phần mềm thống kê SPSS 20.0.</p>

<h3 style="color: #2c3e50; font-size: 18px;">3. Kết quả (Results)</h3>
<p style="text-align: justify;">Mạch máu có hướng đến đồng tử hoặc đứt đoạn chiếm tỷ lệ cao nhất (phải: 92,9%, trái: 92,2%); kích thước to ở phần gốc (phải: 70,5%, trái: 71,2%); màu đỏ nhạt (phải: 69,8%, trái: 69,8%); ban điểm nhỏ (phải: 44,8%, trái: 44,5%); vùng đồng tử lõm, có đường/điểm màu đen, đồng tử dị thường chiếm tỷ lệ cao nhất (phải: 41,6%, trái: 44,1%). Độ nhạy 85,3% ở mắt phải và 82,1% ở mắt trái. Độ đặc hiệu 85,7% ở mắt phải và 81,0% ở mắt trái.</p>

<h3 style="color: #2c3e50; font-size: 18px;">4. Kết luận (Conclusion)</h3>
<p style="text-align: justify;">Mạch máu có hướng đến đồng tử hoặc đứt đoạn, kích thước to ở phần gốc, màu đỏ nhạt, có ban điểm nhỏ là các đặc điểm thường gặp. Phương pháp mục chẩn có độ nhạy và độ đặc hiệu khá cao.</p>

<h3 style="color: #2c3e50; font-size: 18px;">Tài liệu tham khảo (References)</h3>
<ul style="padding-left: 20px;">
  <li>Đỗ Chí Hùng. Nghiên cứu giải pháp can thiệp hội chứng đau vai gáy ở những người sử dụng máy tính. Luận văn Tiến sĩ y học. Trường Đại học Y Hà Nội. 2012.</li>
  <li>Hoàng Thị Mỹ Linh, Nguyễn Thị Tân, Nguyễn Văn Hưng. Tần suất xuất hiện một số triệu chứng lâm sàng theo y học cổ truyền ở bệnh nhân đau vai gáy, Tạp chí Y Dược học – Trường Đại học Y Dược Huế. 2020; 6 (10): 90-96.</li>
  <li>Hoàng Văn Minh, Lưu Ngọc Hoạt. Phương pháp chọn mẫu và tính toán trong nghiên cứu khoa học sức khoẻ, Hà Nội, 2020. 52-55.</li>
  <li>Nguyễn Đình Tý. Nghiên cứu áp dụng phương pháp Mục chẩn trên bệnh nhân đau vai gáy do thoái hóa cột sống cổ. Luận văn Thạc sĩ Y học, Trường Đại học Y Dược Huế. 2020.</li>
  <li>Hoy DG, Protani M, De R, Buchbinder R. The epidemiology of neck pain. Best Pract Res Clin Rheumatol. 2010;24(6):783-792. doi:10.1016/j.berh.2011.01.019.</li>
  <li>廖林丽, 夏飞, 王静敏, 彭清华. 中医诊的基本理论及临床运用. 湖南中医药大学学报. 2019; 922页.</li>
  <li>刘佩, 吉星云. 壮医目诊的研究进展. 广西医学杂志. 2020; 1442-1444页.</li>
  <li>王今党. 望目辩证诊断学. 中国中医药出版社: 北京. 2013; 76-118页.</li>
  <li>李珪, 李彤. 壮医目诊诊断技术规范与应用研究. 广西科学技术出版社: 北京. 2008.</li>
</ul>

<h3 style="color: #2c3e50; font-size: 18px;">Tải về bài nghiên cứu gốc</h3>
<p><a href="https://tapchiyhocvietnam.vn/index.php/vmj/article/view/6349/5673" target="_blank" style="color: #2980b9;">https://tapchiyhocvietnam.vn/index.php/vmj/article/view/6349/5673</a></p>
<p><strong>DOI:</strong> <a href="https://doi.org/10.51298/vmj.v529i1B.6349" target="_blank" style="color: #2980b9;">https://doi.org/10.51298/vmj.v529i1B.6349</a></p>
`,
  publishDate: "30/08/2023",
  readTime: "10 phút",
  category: "Y học cổ truyền",
  tags: ["Mục chẩn", "Đau vai gáy", "Thoái hóa cột sống cổ"],
  image: "/images/article/5.jpg",
  views: 2000,
  likes: 800
},
{
  id: "6",
  title: "NGHIÊN CỨU TÌNH HÌNH ĐIỀU TRỊ THOÁI HÓA KHỚP GỐI CỦA CÁC LƯƠNG Y BẰNG Y HỌC CỔ TRUYỀN TẠI TỈNH THỪA THIÊN HUẾ",
  slug: "nghien-cuu-tinh-hinh-dieu-tri-thoai-hoa-khop-goi-cua-cac-luong-y-bang-y-hoc-co-truyen-tai-tinh-thua-thien-hue",
  excerpt: "Khảo sát quá trình tiếp nhận kiến thức của các Lương y, phương pháp điều trị và thảo dược được sử dụng trong điều trị Thoái hóa khớp gối.",
  content: `
   <p style="font-weight: bold; font-size: 18px;">Mục tiêu nghiên cứu (Objectives)</p>
<p style="margin-left: 20px;">Khảo sát quá trình tiếp nhận kiến thức của các Lương y, phương pháp điều trị và thảo dược được sử dụng trong điều trị Thoái hóa khớp gối.</p>

<p style="font-weight: bold; font-size: 18px;">Phương pháp nghiên cứu (Methods)</p>
<p style="margin-left: 20px;"><strong>Đối tượng:</strong> Những Lương y có trên 5 năm kinh nghiệm điều trị Thoái hóa khớp gối bằng Y học cổ truyền tại các phòng chẩn trị thuộc tỉnh Thừa Thiên Huế.</p>
<p style="margin-left: 20px;"><strong>Phương pháp:</strong> Mô tả cắt ngang, phỏng vấn định lượng, phỏng vấn định tính, phỏng vấn sâu.</p>
<p style="margin-left: 20px;"><strong>Xử lý và phân tích số liệu:</strong> Số liệu được phân tích và xử lý bằng phần mềm thống kê SPSS 20.0.</p>

<p style="font-weight: bold; font-size: 18px;">Kết quả (Results)</p>
<p style="margin-left: 20px;">Về tiếp nhận kiến thức của các Lương y: 92% học từ sách vở, 76% học từ thầy cô, 44% học từ gia đình và 96% tham gia các lớp đào tạo liên tục. 
<br>Về phương pháp điều trị: thuốc thang theo đơn chiếm 100%, xoa bóp chiếm 60%, thảo dược chiếm 32%, châm cứu chiếm 32%, đắp thuốc chiếm 28%, cấy chỉ chiếm 16%.</p>

<p style="font-weight: bold; font-size: 18px;">Kết luận (Conclusion)</p>
<p style="margin-left: 20px;">Các Lương y thường tự học thông qua sách vở, qua học tập từ thầy cô, từ gia đình có truyền thống đông y, cũng như cập nhật từ các lớp đào tạo liên tục. 
<br>Điều trị thoái hóa khớp gối với nhiều phương pháp, thường kết hợp các phương pháp với nhau thay vì sử dụng đơn độc.</p>

<p style="font-weight: bold; font-size: 18px;">Tài liệu tham khảo (References)</p>
<ul style="margin-left: 40px;">
  <li>Wang M, Liu L, Zhang CS, et al. Mechanism of Traditional Chinese Medicine in Treating Knee Osteoarthritis. J Pain Res. 2020;13:1421-1429.</li>
  <li>Wittenauer, Rachel, Lily Smith, and Kamal Aden. Background paper 6.12 osteoarthritis. World Health Organisation 2013.</li>
  <li>Guo J, Chen Y, Li Z, et al. The cerebral mechanism of acupuncture for treating knee osteoarthritis: study protocol for a randomized controlled trial. Trials. 2019;20(1):126.</li>
  <li>Yuan-zhi F, Li G, Jun-tao Y, Min F, Yao-chi W. Effects of acupuncture and Chinese massage on the functions of knee flexors and extensors in patients with knee osteoarthritis: randomized controlled trial. World J Acupuncture Moxibustion. 2010;20(4):29–36.</li>
  <li>Nguyễn Văn Đàn, Nguyễn Thị Nguyên Sinh, Bùi Chí Bảo, Trịnh Thị Diệu Thường. Bước đầu đánh giá hiệu quả điều trị thoái hóa khớp gối của bài thuốc nam trên địa bàn tỉnh Sóc Trăng. Tạp chí Y học thành phố Hồ Chí Minh 2018; 22: 417.</li>
  <li>Nguyễn Thị Bay, Nguyễn Thị Minh Tâm. Đánh giá tác dụng của bài thuốc nam PT5 phối hợp với châm cứu-xoa bóp tập luyện trong điều trị thoái hóa khớp gối. Tạp chí Y học thành phố Hồ Chí Minh 2005; 9 (2): 140.</li>
  <li>Lapane KL, Yang S, Jawahar R, McAlindon T, Eaton C. CAM use among overweight and obese persons with radiographic knee osteoarthritis. BMC Complement Altern Med 2013; 13: 241.</li>
  <li>Nik Abdul Hafiz Nik Shafii, Lili Husniati Yaacob, Azlina Ishak, Azidah Abdul Kadir. Traditional and Complementary Medicine Use in Knee Osteoarthritis and its Associated Factors Among Patients in Northeast Peninsular Malaysia. Oman Med J 2018; 33: 148-153.</li>
  <li>Đỗ Tất Lợi. Những cây thuốc và vị thuốc Việt Nam, Hà Nội: Nhà xuất bản Hồng Đức; 2013.</li>
  <li>Liu L, Wang LP, He S, Immune Homeostasis: MY. Effects of Chinese Herbal Formulae and Herb-Derived Compounds on Allergic Asthma in Different Experimental Models. Chin J Integr Med. 2018;24(5):390–398.</li>
</ul>

<p style="font-weight: bold; font-size: 18px;">Tải về bài nghiên cứu gốc</p>
<p style="margin-left: 20px;"><a href="https://jmp.huemed-univ.edu.vn/BBao/2023/3/PDF_2023m03d010_16_10_2.pdf" target="_blank" style="color: blue; text-decoration: underline;">Tải về bài nghiên cứu</a></p>

<p style="font-weight: bold; font-size: 18px;">Trích dẫn bài báo</p>
<p style="margin-left: 20px;">Trần Nhật Minh, Nguyễn Quang Tâm, Nguyễn Thị Huyền, Đặng Thị Mai Hoa, Đoàn Văn Minh. (2022). Nghiên cứu tình hình điều trị thoái hóa khớp gối của các lương y bằng y học cổ truyền tại tỉnh Thừa Thiên Huế. Tạp chí Y Dược học, 107. DOI: 10.34071/jmp.2022.5.15</p>
`,
  publishDate: "2022-10-01",
  readTime: "5 phút",
  category: "Y học cổ truyền",
  tags: ["Thoái hóa khớp gối", "Y học cổ truyền", "Lương y", "Điều trị", "Thừa Thiên Huế"],
  image: "/images/article/6.jpg",  // Giả sử có một hình ảnh liên quan
  views: 500,
  likes: 45
},
{
  id: "7",
  title: "ĐẶC ĐIỂM LÂM SÀNG VỀ KHÍ, HUYẾT, ÂM, DƯƠNG THEO Y HỌC CỔ TRUYỀN Ở NGƯỜI CAO TUỔI",
  slug: "dac-diem-lam-sang-ve-khi-huyet-am-duong-theo-y-hoc-co-truyen-o-nguoi-cao-tuoi",
  excerpt: "Khảo sát đặc điểm khí, huyết, âm, dương ở người cao tuổi và tìm hiểu một số yếu tố liên quan đến khí, huyết, âm, dương.",
  content: `
    <h2 style="color: #2c3e50; font-size: 24px; margin-top: 20px;">Tóm tắt</h2>

<h3 style="color: #34495e; font-size: 20px;">1. Mục tiêu nghiên cứu</h3>
<p style="font-size: 16px; line-height: 1.6;">Khảo sát đặc điểm khí, huyết, âm, dương ở người cao tuổi và tìm hiểu một số yếu tố liên quan đến khí, huyết, âm, dương.</p>

<h3 style="color: #34495e; font-size: 20px;">2. Phương pháp nghiên cứu</h3>
<p style="font-size: 16px; line-height: 1.6;">Đối tượng: 280 người cao tuổi đến điều trị tại bệnh viện Y học cổ truyền Thừa Thiên Huế.</p>
<p style="font-size: 16px; line-height: 1.6;">Phương pháp: Mô tả cắt ngang.</p>
<p style="font-size: 16px; line-height: 1.6;">Xử lý và phân tích số liệu: Số liệu sau khi thu thập được nhập và làm sạch bằng phần mềm Epiadata 3.1. Phân tích, xử lý số liệu bằng phần mềm thống kê SPSS 20.0.</p>

<h3 style="color: #34495e; font-size: 20px;">3. Kết quả</h3>
<p style="font-size: 16px; line-height: 1.6;">Dương hư 55,4%, huyết hư 55,0%, âm hư 32,1%, khí hư 26,1%. Có mối liên quan giữa tình trạng khí huyết hư, khí âm hư, khí huyết âm dương đều hư với giới; giữa huyết hư, âm hư, âm dương hư, khí âm hư, âm huyết hư, khí huyết âm dương đều hư với tình trạng mất ngủ; giữa huyết hư, âm dương hư, âm huyết hư, khí huyết âm dương đều hư với thể trạng (p&lt;0,05).</p>

<h3 style="color: #34495e; font-size: 20px;">4. Kết luận</h3>
<p style="font-size: 16px; line-height: 1.6;">Khí hư, huyết hư, âm hư, dương hư là các hội chứng thường gặp, dương hư chiếm tỷ lệ cao nhất tiếp đến là huyết hư; khí huyết hư, khí âm hư, khí huyết âm dương đều hư gặp ở nữ nhiều hơn so với nam; mất ngủ là biểu hiện lâm sàng có nhiều mối liên quan với tình trạng khí, huyết, âm, dương.</p>

<h3 style="color: #34495e; font-size: 20px;">Tài liệu tham khảo</h3>
<ul style="font-size: 16px; line-height: 1.6; padding-left: 20px;">
  <li>Prince, M. J., ... <a href="https://doi.org/10.1016/S0140-6736(14)61347-7">doi: 10.1016/S0140-6736(14)61347-7</a>.</li>
  <li>Phạm Vũ Khánh (2009), Lão khoa Y học cổ truyền, ...</li>
  <li>Kim JH, ...</li>
  <li>Park Hye Bin, ... <a href="https://doi.org/10.3831/KPI.2017.20.013">doi: 10.3831/KPI.2017.20.013</a>.</li>
  <li>Woo HJ, ...</li>
  <li>张舜波, 游秋云 (2013), ...</li>
  <li>李卫丽, ...</li>
  <li>熊红萍, ...</li>
  <li>Hamid Montakab (2012), ...</li>
</ul>

<h3 style="color: #34495e; font-size: 20px;">Tải về bài nghiên cứu gốc</h3>
<a href="https://jmp.huemed-univ.edu.vn/BBao/2022/6/PDF_2022m06d07_15_50_8.pdf" style="font-size: 16px; color: #2980b9;">Tải về tại đây</a>

<h3 style="color: #34495e; font-size: 20px;">Trích dẫn bài báo</h3>
<p style="font-size: 16px; line-height: 1.6;">Nguyễn Thị Kim Liên, Nguyễn Thị Hồng Lĩnh, Nguyễn Quang Tâm. (2021). Đặc điểm lâm sàng về khí, huyết, âm, dương theo y học cổ truyền ở người cao tuổi. Tạp chí Y Dược học, 44. DOI: 10.34071/jmp.2021.6.6</p>
`,
  publishDate: "2021",
  readTime: "5 minutes",
  category: "Y học cổ truyền",
  tags: ["Khí hư", "Huyết hư", "Âm hư", "Dương hư", "Người cao tuổi"],
  image: "/images/article/7.jpg",
  views: 1200,
  likes: 150
},
{
  id: "8", 
  title: "Nghiên cứu đặc điểm chức năng tạng thận theo y học cổ truyền ở bệnh nhân vô sinh có hội chứng buồng trứng đa nang",
  slug: "nghien-cuu-dac-diem-chuc-nang-tang-than-theo-y-hoc-co-truyen-o-benh-nhan-vo-sinh-co-hoi-chung-buong-trung-da-nang",
  excerpt: "Nghiên cứu khảo sát đặc điểm chức năng tạng thận theo Y học cổ truyền ở bệnh nhân vô sinh có hội chứng buồng trứng đa nang...",
  content: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; font-size: 14px; color: #333;">
  <p style="font-weight: bold; font-size: 16px;">1. Mục tiêu nghiên cứu (Objectives)</p>
  <p>Khảo sát đặc điểm chức năng tạng thận theo Y học cổ truyền và tìm hiểu một số yếu tố liên quan ở bệnh nhân vô sinh có hội chứng buồng trứng đa nang.</p>

  <p style="font-weight: bold; font-size: 16px;">2. Phương pháp nghiên cứu (Methods)</p>
  <p><strong>Đối tượng:</strong> 110 bệnh nhân nữ vô sinh có hội chứng buồng trứng đa nang tại Trung tâm Nội tiết sinh sản và Vô sinh, Bệnh viện Trường Đại học Y - Dược Huế.</p>
  <p><strong>Phương pháp:</strong> Mô tả cắt ngang.</p>
  <p><strong>Xử lý và phân tích số liệu:</strong> Số liệu sau khi thu thập được nhập và làm sạch, phân tích, xử lý số liệu bằng phần mềm thống kê SPSS 20.0. Sử dụng test Kruskal-Wallis để so sánh các giá trị trung bình.</p>

  <p style="font-weight: bold; font-size: 16px;">3. Kết quả (Results)</p>
  <p>Các triệu chứng thận tinh/khí hư chiếm tỷ lệ cao (&gt; 60%) và có điểm số trung bình cao nhất (5,3 ± 2,5). Hội chứng thận âm hư chiếm 49,1%, thận dương hư 36,4% và thận âm dương hư là 20,9%, điểm số trung bình của thận âm cao hơn điểm số thận dương. Có sự khác biệt về điểm số thận dương giữa các loại thể trạng, về điểm số thận âm, thận dương và tình trạng có hội chứng thận âm dương hư giữa các loại vô sinh.</p>

  <p style="font-weight: bold; font-size: 16px;">4. Kết luận (Conclusion)</p>
  <p>Các triệu chứng trong hội chứng thận âm hư và thận dương hư xuất hiện với tỷ lệ khá cao. Hội chứng thận âm hư chiếm tỷ lệ cao nhất, tiếp đến là thận dương hư và thận âm dương hư. Điểm số thận dương ở nhóm thừa cân, béo phì cao hơn nhóm gầy và bình thường. Vô sinh thứ phát có điểm số thận âm và thận thận dương cao hơn nguyên phát.</p>

  <p style="font-weight: bold; font-size: 16px;">Tài liệu tham khảo (References)</p>
  <ul style="margin-left: 20px;">
    <li>Neven, Adriana Catharina Helena, et al. “A summary on polycystic ovary syndrome...”</li>
    <li>Cao N.T., Le M.T., Nguyen V.Q.H., et al...</li>
    <li>Trần Quốc Bảo. Bệnh học phụ khoa Y học cổ truyền Tập 1...</li>
    <li>...</li>
    <li>Trần Thị Thu Hạnh. Nghiên cứu sự biến đổi, giá trị của nồng độ LH...</li>
  </ul>

  <p style="font-weight: bold;">Tải về bài nghiên cứu gốc</p>
  <p><a href="https://jmp.huemed-univ.edu.vn/BBao/2023/5/PDF_2023m05d016_7_57_40.pdf" style="color: #0066cc; text-decoration: none;">Tải bài nghiên cứu gốc</a></p>
  <p><strong>DOI:</strong> 10.34071/jmp.2023.2.15</p>
</div>

  `,
  publishDate: "2023-04-01",
  readTime: "5 minutes", 
  category: "Y học cổ truyền",
  tags: [
    "Tạng thận", 
    "Y học cổ truyền", 
    "Hội chứng buồng trứng đa nang", 
    "Vô sinh"
  ],
  image: "/images/article/8.jpg",
  views: 1234,  
  likes: 456  
},
{
  id: "9",
  title: "Tổng quan về vô sinh nam theo y học cổ truyền và tình hình nghiên cứu điều trị vô sinh nam bằng y học cổ truyền tại Việt Nam",
  slug: "tong-quan-vo-sinh-nam-y-hoc-co-truyen-viet-nam",
  excerpt: "Bài viết trình bày tổng quan về vô sinh nam theo y học cổ truyền và tình hình nghiên cứu điều trị vô sinh nam bằng y học cổ truyền tại Việt Nam.",
  content: `
   <p style="font-weight: bold;">Tác giả:</p> Lê Minh Hoàng<sup>1</sup>, Phan Anh Tuấn<sup>1,2</sup>, Đào Trần Nhất Phong<sup>1</sup>
<p><sup>1</sup>Trường Đại học Y Dược Cần Thơ<br/>
<sup>2</sup>Trường Cao đẳng Dược Hà Nội</p>
<p style="font-weight: bold;">Ngày xuất bản:</p> 15/02/2024
<p style="font-weight: bold;">Từ khóa:</p> Vô sinh nam, Y học cổ truyền.
<h3 style="font-size: 1.2em;">Tóm tắt (Summary)</h3>
<p>Trong những năm gần đây, tỉ lệ vô sinh đang tăng cao ở mức đáng báo động. Vô sinh không chỉ là vấn đề sức khỏe mà còn là vấn đề tình cảm và xã hội, thậm chí có thể dẫn đến ly hôn ở một số nền văn hóa. Vì vậy vô sinh luôn được quan tâm dù ở bất cứ thời đại nào. Ở nam giới, nguyên nhân gây vô sinh ở nam giới rất khác nhau, nhưng có thể liên quan đến các yếu tố bẩm sinh, mắc phải hoặc vô căn làm suy giảm quá trình sinh tinh. Theo Y học cổ truyền (YHCT), vô sinh liên quan đến các suy giảm chức năng của các tạng phủ, tinh khí huyết và sinh lý thiên quý của con người, từ đó YHCT đề xuất nhiều phương pháp khác nhau điều trị vô sinh nam thông qua điều lý các tạng phủ. Mặc dù vậy, vô sinh nam vẫn chưa có phương pháp nào được xem đặc trị trong YHCT. Tuy nhiên, xu hướng điều trị kết hợp giữa 2 nền y học được nhiều người bệnh quan tâm. Một số nghiên cứu về điều trị vô sinh nam bằng YHCT ở Việt Nam bước đầu cho thấy hiệu quả tốt.</p>
<h3 style="font-size: 1.2em;">Tài liệu tham khảo (References)</h3>
<ol>
  <li>Trần Quán Anh, Trần Thị Trung Chiến, Lê Văn Vệ (2009), Bệnh học giới tính nam, Vô sinh nam giới, Nhà xuất bản Y học, Hà Nội, tr. 253-323.</li>
  <li>Đậu Thùy Dương (2018), Nghiên cứu độc tính và tác dụng trên chức năng sinh sản của OS35 trong thực nghiệm, Luận án Tiến sĩ Y học, Trường Đại học Y Hà Nội, Hà Nội.</li>
  <li>Phan Minh Đức (2019), Nghiên cứu tính an toàn và tác dụng của viên nang Balanoxi trên thực nghiệm và lâm sàng ở bệnh nhân suy giảm tinh trùng, Luận văn Tiến sĩ Y học, Chuyên ngành Y học cổ truyền, Viện Y học cổ truyền Quân đội, Hà Nội.</li>
  <li>Lê Minh Hoàng, Vũ Ngọc Thắng, Nguyễn Hoàng Ngân, Phạm Xuân Phong, Nguyễn Duy Bắc (2018), “Nghiên cứu tác dụng cải thiện khả năng sinh tinh của viên nang Y10 trên động vật thực nghiệm”, Tạp chí Y dược cổ truyền quân sự, 3(8), tr6-13.</li>
  <li>Nguyễn Thanh Hương (2017), Nghiên cứu tính an toàn và tác dụng của dịch chiết nước Tỏa dương (Balanophora laxiflora) lên một số chỉ tiêu sinh sản ở chuột đực, Luận văn Tiến sĩ Y học, Chuyên ngành Y học cổ truyền, Viện Y học cổ truyền Quân đội, Hà Nội.</li>
  <li>Hải Thượng Lãn Ông (2001), Hải Thượng Lãn Ông Y tông tâm lĩnh, tái bản nguyên bản, Nhà xuất bản Y học, Hà Nội, tập 1-2, tr.265-75, 423-24, 432-41, 550-71.</li>
  <li>Mai Phương Thanh, Phạm Thị Vân Anh, Nguyễn Trọng Thông, Nguyễn Thị Hương Liên (2020). Tác dụng phục hồi của TD0014 trên chuột cống trắng bị gây suy giảm sinh sản bằng natri valproat. Tạp chí Nghiên cứu Y học, 126(2), 20-30.</li>
  <li>Vũ Ngọc Thắng, Nguyễn Hoàng Ngân, Nguyễn Minh Phương, Nguyễn Thanh Hà Tuấn (2020). Đánh giá tác dụng của viên nang Trường Xuân CB lên đặc điểm tinh dịch động vật thực nghiệm. Tạp chí Y học Việt Nam, 494 (số 1-tháng 9); 213-218.</li>
  <li>Đoàn Minh Thụy (2010), Nghiên cứu tính an toàn và hiệu quả của bài thuốc Hồi xuân hoàn trong điều trị bệnh nhân bị suy giảm tinh trùng. Luận án tiến sỹ y học, Trường đại học Y Hà Nội: tr. 136.</li>
  <li>Phan Anh Tuấn, Trịnh Hoài Nam, Trần Thị Thơm (2013), "Nghiên cứu tác dụng của sâu chít (Brihasp Atrostigmella Moore) lên một số chỉ số chức năng sinh sản ở chuột cống đực", Tạp chí Y học Việt Nam. Số chuyên đề y học giới tính (Sexual medicine), tr. 675-681.</li>
  <li>Zhou, S. H. and Deng, Y. F. (2019), "Traditional Chinese Medicine as a Remedy for Male Infertility: A Review", World J Mens Health.37(2), pp.175-185.</li>
  <li>徐福松 (2018), 实用中医男科学, 中国中医出本社, 中国. (Xu Fu Xong (2018), Thực dụng YHCT trong Nam khoa, NXB Trung Y Trung Quốc, Trung Quốc).</li>
</ol>
<p style="font-weight: bold;">Tải về bài nghiên cứu gốc:</p> <a href="https://tapchiyhocvietnam.vn/index.php/vmj/article/view/8462/7480" target="_blank">Tại đây</a>
<p style="font-weight: bold;">DOI:</p> <a href="https://doi.org/10.51298/vmj.v535i1B.8462" target="_blank">https://doi.org/10.51298/vmj.v535i1B.8462</a>
<p style="font-weight: bold;">Trích dẫn bài báo:</p> Lê, M. H., Phan, A. T., & Đào, T. N. P. (2024). Tổng quan về vô sinh nam theo y học cổ truyền và tình hình nghiên cứu điều trị vô sinh nam bằng y học cổ truyền tại Việt Nam. Tạp Chí Y học Việt Nam, 535(1B). https://doi.org/10.51298/vmj.v535i1B.8462
`,
  publishDate: "2024-02-15",
  readTime: "6 phút",
  category: "Y học cổ truyền",
  tags: ["Vô sinh nam", "Y học cổ truyền", "Nghiên cứu lâm sàng"],
  image: "/images/article/9.jpg",
  views: 241,
  likes: 100
}

];



export const getArticleById = (id:string) => {
    return articles.find((article) => article.id === id);
};

export const getAllArticles = () => {
    return articles;
};