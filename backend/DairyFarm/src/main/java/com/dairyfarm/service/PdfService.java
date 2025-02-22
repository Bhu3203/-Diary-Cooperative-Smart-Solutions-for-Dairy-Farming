package com.dairyfarm.service;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.dairyfarm.dto.EmailRequest;
import com.dairyfarm.dto.MilkRecordsDto;
import com.dairyfarm.entity.MilkRecord;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.HorizontalAlignment;
import com.itextpdf.layout.properties.TextAlignment;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.util.ByteArrayDataSource;

@Service
public class PdfService {

    @Autowired
    private FarmerService farmerService;
    @Autowired 
    private IOrderService orderService;

    @Autowired
    private EmailService emailService;

    public byte[] generateReport(Integer farmerId) throws IOException {
        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            PdfWriter pdfWriter = new PdfWriter(out);
            PdfDocument pdfDocument = new PdfDocument(pdfWriter);
            Document document = new Document(pdfDocument);

            String imagePath = new ClassPathResource("static/images/BhuDairy.jpg").getFile().getAbsolutePath();
            Image image = new Image(ImageDataFactory.create(imagePath))
                    .scaleToFit(150, 100)
                    .setHorizontalAlignment(HorizontalAlignment.CENTER);
            document.add(image);

            Paragraph title = new Paragraph("Record Report for Farmer ID: " + farmerId)
                    .setFontSize(25)
                    .setFontColor(ColorConstants.MAGENTA)
                    .setTextAlignment(TextAlignment.CENTER)
                    .simulateBold();
            document.add(title);

            float[] colWidths = {150f, 50f, 150f, 150f, 50f, 50f, 50f};
            Table table = new Table(colWidths);
            table.addHeaderCell(new Cell().add(new Paragraph("Date")));
            table.addHeaderCell(new Cell().add(new Paragraph("Farmer Id")));
            table.addHeaderCell(new Cell().add(new Paragraph("Time")));
            table.addHeaderCell(new Cell().add(new Paragraph("Cattle")));
            table.addHeaderCell(new Cell().add(new Paragraph("Milk(ltr)")));
            table.addHeaderCell(new Cell().add(new Paragraph("Fat")));
            table.addHeaderCell(new Cell().add(new Paragraph("Snf")));

            List<MilkRecordsDto> records = farmerService.getMilkRecordsByFarmerId(farmerId);

            if (records.isEmpty()) {
                document.add(new Paragraph("No records found for this farmer."));
            } else {
                double totalLitre = 0;
                double totalFat = 0;
                double totalSnf = 0;
                // ***IMPORTANT: Get price per liter from configuration or database***
                double pricePerLitre = getPricePerLitre(); // Replace with your logic

                for (MilkRecordsDto record : records) {
                    totalLitre += record.getLitre();
                    totalFat += record.getFat();
                    totalSnf += record.getSnf();
                }

                double averageFat = records.size() > 0 ? totalFat / records.size() : 0;
                double averageSnf = records.size() > 0 ? totalSnf / records.size() : 0;
                double totalAmount = totalLitre * pricePerLitre;

                records.forEach(record -> {
                    table.addCell(new Cell().add(new Paragraph(String.valueOf(record.getDate()))));
                    table.addCell(new Cell().add(new Paragraph(String.valueOf(record.getFarmerId()))));
                    table.addCell(new Cell().add(new Paragraph(record.getTime())));
                    table.addCell(new Cell().add(new Paragraph(record.getCattle())));
                    table.addCell(new Cell().add(new Paragraph(String.valueOf(record.getLitre()))));
                    table.addCell(new Cell().add(new Paragraph(String.valueOf(record.getFat()))));
                    table.addCell(new Cell().add(new Paragraph(String.valueOf(record.getSnf()))));
                });
                document.add(table);

                document.add(new Paragraph("Summary:").setFontSize(14));
                document.add(new Paragraph("Total Milk (ltr): " + String.format("%.2f", totalLitre)));
                document.add(new Paragraph("Average Fat: " + String.format("%.2f", averageFat)));
                document.add(new Paragraph("Average Snf: " + String.format("%.2f", averageSnf)));
                document.add(new Paragraph("Total Amount: " + String.format("%.2f", totalAmount)));
            }

            document.close();
            return out.toByteArray();

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
private void mail(MilkRecord savedRecord) throws UnsupportedEncodingException, MessagingException {
	    
	    String msg = "<html><body><h2>Hello, " +
                "farmerName" + "!</h2><p>Please find attached your milk record report."
        		+ "</p><p>Thank you for your contribution.</p><p>Best Regards,"
        		+ "<br>Dairy Farm Team</p></body></html>";

	    msg = msg.replace("[[fname]]", savedRecord.getUser().getFirstName());
	    

	    EmailRequest emailRequest = EmailRequest.builder()
	            .to(savedRecord.getUser().getEmail())
	            .subject("Sadguru Dairy Farming") 
	            .title("Milk Record Details") 
	            .message(msg)
	            .build();

	    emailService.sendMail(emailRequest);
	}
 


       


        private double getPricePerLitre() {

            return 30; 
        }

//	public byte[] generateOrderReport() {
//		try(ByteArrayOutputStream out = new ByteArrayOutputStream()) {
//			PdfWriter pdfWriter = new PdfWriter(out);
//			PdfDocument pdfDocument = new PdfDocument(pdfWriter);
//			Document document = new Document(pdfDocument);
//			
//			String imgPath = new ClassPathResource("static/images/BhuDairy.jpg").getFile().getAbsolutePath();
//			Image image = new Image(ImageDataFactory.create(imgPath))
//					.scaleToFit(150, 100)
//					.setHorizontalAlignment(HorizontalAlignment.CENTER);
//			document.add(image);
//			
//			Paragraph title = new Paragraph("Order Report")
//					.setFontSize(25)
//					.setFontColor(ColorConstants.MAGENTA)
//					.setTextAlignment(TextAlignment.CENTER)
//					.simulateBold();
//			document.add(title);
//			
//			float[] colWidths = {50f, 150f, 150f, 150f};
//			Table table = new Table(colWidths);
//			table.addHeaderCell(new Cell().add(new Paragraph("Order Id")));
//			table.addHeaderCell(new Cell().add(new Paragraph("Order By")));
//			table.addHeaderCell(new Cell().add(new Paragraph("Amount")));
//			table.addHeaderCell(new Cell().add(new Paragraph("Status")));
//			
//			
//		
//			
//			orderService.getAllOrders().stream().forEach(order -> {
//				table.addCell(new Cell().add(new Paragraph(String.valueOf(order.getOrderId()))));
//				table.addCell(new Cell().add(new Paragraph(order.getUser().getFirstName())));
//				table.addCell(new Cell().add(new Paragraph(String.valueOf(order.getAmount()))));
//				table.addCell(new Cell().add(new Paragraph(order.getStatus().toString())));
//			});
//			document.add(table);
//			
//			document.close();
//			return out.toByteArray();
//			
//		} catch (Exception e) {
//			e.printStackTrace();
//			return null;
//		}
//	}
//}
}
