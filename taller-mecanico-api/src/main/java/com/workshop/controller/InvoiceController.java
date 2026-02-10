package com.workshop.controller;

import com.workshop.common.BaseController;
import com.workshop.domain.Invoice;
import com.workshop.service.InvoiceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController extends BaseController<Invoice, Long, InvoiceService> {

    public InvoiceController(InvoiceService service) {
        super(service);
    }

    @PostMapping("/generate")
    public ResponseEntity<Invoice> generateInvoice(@RequestParam Long workOrderId) {
        return ResponseEntity.ok(service.generateInvoice(workOrderId));
    }

    @PatchMapping("/{id}/pay")
    public ResponseEntity<Void> markAsPaid(@PathVariable Long id) {
        service.markAsPaid(id);
        return ResponseEntity.ok().build();
    }
}
