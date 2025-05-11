import { Practitioner } from "@/types";


const practitioners : Practitioner[] = [
    {
        id: 1,
        name: "Làm Văn Chung",
        specializations: [
            { id: 1, name: "Xương khớp", description: null, userIds: [] },
            { id: 2, name: "Phổi", description: null, userIds: [] },
        ],
        address: "Cẩm Đàn - Sơn Động - Bắc Giang",
        phoneNumber: "0386732177",
        email: "",
        experience: 20,
        profilePic: "/images/thay-lang/1.jpg",
        isVerified: true,
        isOnline: true,
        description: `
        <p>Thầy lang Làm Văn Chung - Phó Chủ tịch Hội Đông y huyện Sơn Động - đã có hơn 20 năm kinh nghiệm hành nghề Y học cổ truyền, được đào tạo chính quy và tốt nghiệp Trung cấp Y sĩ YHCT. 
        Hiện ông cũng sở hữu Giấy chứng nhận Lương y và Giấy phép hành nghề khám chữa bệnh. Với nền tảng kiến thức sâu rộng về y lý cổ truyền, ông chuyên điều trị các vấn đề xương khớp như 
        thoái hóa cột sống, đau vai gáy, thoát vị đĩa đệm và viêm khớp mạn tính bằng cách kết hợp vật lý trị liệu (xoa bóp, bấm huyệt), 
        đắp thuốc và kê đơn thuốc uống cổ truyền để giảm đau và hồi phục chức năng vận động. Ngoài ra, ông còn chữa được bệnh viêm phổi, u phổi, ung thư phổi di căn.</p>
        `,
        degrees: [
            {
                name: "Chứng nhận hành nghề số 01/2010/SYT-HT do Sở Y tế Hà Tĩnh cấp",
                urlPic: "/placeholder.svg?height=100&width=100&text=Chứng chỉ",
                awardingBody: "Sở Y tế Hà Tĩnh",
                dateOfIssue: "2010-01-01",
                isEnable: true
            },
        ],
        services: [
            {
                id: "1",
                name: "Xoa bóp",
                duration: 0,
                description: "",
                price: 0
            },
            {
                id: "2",
                name: "Bấm Huyệt",
                duration: 0,
                description: "",
                price: 0
            },
            {
                id: "3",
                name: "Đắp Thuốc",
                duration: 0,
                description: "",
                price: 0
            },
            {
                id: "4",
                name: "Bốc Thuốc",
                duration: 0,
                description: "",
                price: 0
            },
        ],
        schedule: [
            {
                day: "Thứ Hai - Thứ Sáu",
                hours: "08:00 - 17:00"
            },
            {
                day: "Thứ Bảy",
                hours: "08:00 - 12:00"
            },
            {
                day: "Chủ Nhật",
                hours: "Nghỉ"
            }
        ],
        remedies: [
            {
                id: 1,
                name: "",
                urlPic: "",
                description: "Các bài chữa bệnh của tôi đều là độc quyền.",
                isEnable: null,
                businessUserId: 0
            }
        ],
        userRole: null,
        subscriptionId: null,
        subscriptionPlan: null,
        businessType: null,
        dayStarted: "",
        ratings: null,
        clinicPhotos: [],
        herbalMedicines: [],
        reviews: Array(10).fill(null) ,
        products: [],
        rating: 4.5
    },
    {
        id: 2,
        name: "Trần Minh Tạ",

        specializations: [
            { id: 1, name: " Liệt dây thần kinh số 7", description: null, userIds: [] },
            { id: 2, name: "Tiêu hoá", description: null, userIds: [] },
             { id: 3, name: "Thần kinh", description: null, userIds: [] }
        ],
        address: "Làng Sầy - xã Tuấn Đạo - Sơn Động - Bắc Giang",
        phoneNumber: "0355356479",
        email: "",
        experience: 30,
        profilePic: "/images/thay-lang/2.jpg",
        isVerified: true,
        isOnline: true,
        description: `
            <p>Thầy lang Trần Minh Tạ đã gắn bó với nghề hơn 25 năm tại Sơn Động – Bắc Giang, hiện đã nhận được Giấy chứng nhận Lương y do Hội Đông y cấp. 
            Ông tập trung ứng dụng bài thuốc đắp thuốc gia truyền để chữa méo mồm (liệt dây thần kinh số 7) và các chứng bệnh dạ dày mạn tính. 
            Phương pháp chữa bệnh của ông gồm chọn lọc thảo dược bản địa, sơ chế đắp trực tiếp lên vùng tổn thương và kết hợp rửa dạ dày bằng thuốc sắc để cân bằng tiêu hóa.
            </p>
            <p>Dịch vụ: Điều trị méo miệng, dạ dày</p>
        `,
        degrees: [],
        services: [
            {
                id: "1",
                name: "Đắp thuốc",
                price: 0,
                duration: 40,
                description: ""
            },
        ],
        schedule: [
            {
                day: "Thứ Hai - Thứ Sáu",
                hours: "09:00 - 18:00"
            },
            {
                day: "Thứ Bảy",
                hours: "09:00 - 12:00"
            },
            {
                day: "Chủ Nhật",
                hours: "Nghỉ"
            }
        ],
        remedies: [],
        userRole: null,
        subscriptionId: null,
        subscriptionPlan: null,
        businessType: null,
        dayStarted: "",
        ratings: null,
        clinicPhotos: [],
        herbalMedicines: [],
        reviews: Array(9).fill(null) ,
        products: [],
        rating: 4.5
    },
        {
            id: 3,
            name: "Triệu Thị Hoa",
            specializations: [
                { id: 1, name: " Xương khớp", description: null, userIds: [] },
                { id: 2, name: "Tiêu hóa", description: null, userIds: [] },
                { id: 3, name: "Răng miệng", description: null, userIds: [] },
                { id: 4, name: "Cảm cúm", description: null, userIds: [] },
            ],
            address: "Tổ dân phố Mậu, thị trấn Tây Yên Tử, Sơn Động, Bắc Giang",
            phoneNumber: "'0357315303",
            email: "",
            experience: 20,
            profilePic: "/images/thay-lang/3.jpg",
            isVerified: true,
            isOnline: true,
            description: `
            <p>Bà Triệu Thị Hoa, thầy thuốc dân tộc Dao với hơn 30 năm kinh nghiệm thực hành Y học cổ truyền, là thành viên tích cực của Hội Đông y. 
            Bà nổi tiếng với bài thuốc tắm chữa đau nhức xương khớp, xoa bóp tại chỗ đau, hỗ trợ sau sinh (tắm gừng gió, rượu thuốc) và điều trị cảm cúm,
             rối loạn tiêu hóa, sâu răng. Bà còn pha chế các loại cao và dầu xoa để gia tăng hiệu quả điều trị.
            </p>
        `,
            degrees: [],
            services: [
                {
                    id: "1",
                    name: "Xông tắm",
                    price: 0,
                    duration: 0,
                    description: ""
                },
                {
                    id: "2",
                    name: "Bốc Thuốc",
                    price: 0,
                    duration: 0,
                    description: ""
                },
            ],
            schedule: [
                {
                    day: "Thứ Hai - Thứ Sáu",
                    hours: "08:00 - 16:00"
                },
                {
                    day: "Thứ Bảy",
                    hours: "08:00 - 11:00"
                },
                {
                    day: "Chủ Nhật",
                    hours: "Nghỉ"
                }
            ],
            userRole: null,
            subscriptionId: null,
            subscriptionPlan: null,
            businessType: null,
            dayStarted: "",
            ratings: null,
            clinicPhotos: [],
            herbalMedicines: [],
            remedies: [],
            reviews: Array(10).fill(null) ,
            products: [],
            rating: 4.6
        },
        {
            id: 4,
            name: "Hoàng Vương Sỏi",
            specializations: [
                { id: 1, name: "Ngộ độc", description: null, userIds: [] },
                { id: 2, name: "Tiêu hoá", description: null, userIds: [] },
                { id: 3, name: "Vai gáy", description: null, userIds: [] },
                { id: 4, name: "Vôi hoá", description: null, userIds: [] },
                { id: 5, name: "Bại liệt", description: null, userIds: [] },
                { id: 6, name: "Thần kinh", description: null, userIds: [] }
            ],
            address: "Thanh Hà - Thanh Luận - Sơn Động - Bắc Giang",
            phoneNumber: "0338851415",
            email: "",
            experience: 19,
            profilePic: "/images/thay-lang/4.jpg",
            isVerified: true,
            isOnline: true,
            description: `
            <p>Thầy lang Hoàng Vương Sỏi đã có 19 năm đóng góp trong vai trò thành viên Hội Đông y và sở hữu bài thuốc dân gian được Hội Đông y công nhận. 
            Ông chuyên giải quyết các vấn đề về viêm dạ dày và ngộ độc thực phẩm; sử dụng kỹ thuật xoa bóp, bấm huyệt chữa nhức mỏi vai gáy, vôi hóa cột sống, bại liệt.
            </p>
        `,
            degrees: [],
            services: [
                {
                    id: "1",
                    name: "Bốc thuốc",
                    price: 0,
                    duration: 0,
                    description: ""
                },
                {
                    id: "2",
                    name: "Xoa bóp",
                    price: 0,
                    duration: 0,
                    description: ""
                },
                {
                    id: "3",
                    name: "Bấm huyệt",
                    price: 0,
                    duration: 0,
                    description: ""
                }
            ],
            schedule: [
                {
                    day: "Thứ Hai - Thứ Sáu",
                    hours: "08:30 - 17:30"
                },
                {
                    day: "Thứ Bảy",
                    hours: "08:30 - 12:30"
                },
                {
                    day: "Chủ Nhật",
                    hours: "Nghỉ"
                }
            ],
            remedies: [],
            userRole: null,
            subscriptionId: null,
            subscriptionPlan: null,
            businessType: null,
            dayStarted: "",
            ratings: null,
            clinicPhotos: [],
            herbalMedicines: [],
            reviews: Array(8).fill(null) ,
            products: [],
            rating: 5
        }

];

export function getAllPractitioners() {
  return practitioners;
}

export function getPractitionerById(id: number) {
  return practitioners.find(practitioner => practitioner.id == id) || null;
}