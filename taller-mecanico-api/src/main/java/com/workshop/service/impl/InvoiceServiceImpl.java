package com.workshop.service.impl;

import com.workshop.domain.Invoice;
import com.workshop.domain.WorkOrder;
import com.workshop.repository.InvoiceRepository;
import com.workshop.repository.WorkOrderRepository;
import com.workshop.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class InvoiceServiceImpl implements InvoiceService {
    private final InvoiceRepository repository;
    private final WorkOrderRepository workOrderRepository;

    @Override
    public List<Invoice> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Invoice> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Invoice save(Invoice entity) {
        return repository.save(entity);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Invoice generateInvoice(Long workOrderId) {
        WorkOrder workOrder = workOrderRepository.findById(workOrderId)
                .orElseThrow(() -> new RuntimeException("WorkOrder not found"));

        if (workOrder.getInvoice() != null) {
            throw new RuntimeException("WorkOrder already has an invoice");
        }

        if (workOrder.getStatus() != WorkOrder.Status.COMPLETED) {
            throw new RuntimeException("Cannot generate invoice for incomplete work order");
        }

        Invoice invoice = new Invoice();
        invoice.setInvoiceNumber("INV-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        invoice.setInvoiceDate(LocalDate.now());
        invoice.setDueDate(LocalDate.now().plusDays(30)); // 30 days credit

        BigDecimal subtotal = workOrder.getTotalActualCost();
        BigDecimal taxRate = new BigDecimal("0.18"); // 18% Tax
        BigDecimal taxAmount = subtotal.multiply(taxRate);
        BigDecimal totalAmount = subtotal.add(taxAmount);

        invoice.setSubtotal(subtotal);
        invoice.setTaxAmount(taxAmount);
        invoice.setTaxPercentage(new BigDecimal("18.00"));
        invoice.setTotalAmount(totalAmount);

        // As status PENDING does not exist, using ISSUED or DRAFT. Assuming ISSUED for
        // generated invoice.
        invoice.setStatus(Invoice.Status.ISSUED);

        invoice.setWorkOrder(workOrder);
        invoice.setClient(workOrder.getClient());

        return repository.save(invoice);
    }

    @Override
    public void markAsPaid(Long invoiceId) {
        Invoice invoice = repository.findById(invoiceId).orElseThrow(() -> new RuntimeException("Invoice not found"));
        invoice.setStatus(Invoice.Status.PAID);
        invoice.setPaymentDate(LocalDate.now());
        repository.save(invoice);
    }
}
