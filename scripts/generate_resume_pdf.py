import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def create_resume(output_path):
    # Page setup: Standard letter with 0.45 in (32.4 pt) margins to fit exactly 1 page
    margin = 32
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=margin,
        rightMargin=margin,
        topMargin=28,
        bottomMargin=28
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    primary_color = colors.HexColor('#0f172a')   # Slate 900
    section_color = colors.HexColor('#1e293b')   # Slate 800
    text_color = colors.HexColor('#334155')      # Slate 700
    link_color = colors.HexColor('#0284c7')      # Sky 600
    line_color = colors.HexColor('#cbd5e1')      # Slate 300

    name_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=22,
        textColor=primary_color,
        alignment=1 # Center
    )

    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=text_color,
        alignment=1 # Center
    )

    section_header_style = ParagraphStyle(
        'SectionHeaderStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=12,
        textColor=section_color,
        spaceBefore=5,
        spaceAfter=2,
        textTransform='uppercase'
    )

    item_title_style = ParagraphStyle(
        'ItemTitleStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=11,
        textColor=primary_color
    )

    item_meta_style = ParagraphStyle(
        'ItemMetaStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=text_color,
        alignment=2 # Right
    )

    body_style = ParagraphStyle(
        'BodyStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=text_color
    )

    bullet_style = ParagraphStyle(
        'BulletStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.2,
        leading=11,
        textColor=text_color,
        leftIndent=10,
        firstLineIndent=-6
    )

    story = []

    # 1. Header (Name & Contacts)
    story.append(Paragraph("Harsh Kashyap", name_style))
    story.append(Spacer(1, 3))
    
    contacts_text = (
        "+91 9279584866 &nbsp;|&nbsp; "
        "harshjha9279@gmail.com &nbsp;|&nbsp; "
        "<a href='https://github.com/Harsh927995' color='#0284c7'>github.com/Harsh927995</a> &nbsp;|&nbsp; "
        "<a href='https://www.linkedin.com/' color='#0284c7'>linkedin.com/in/harsh-kashyap</a>"
    )
    story.append(Paragraph(contacts_text, contact_style))
    story.append(Spacer(1, 6))

    # Helper function for section headings
    def add_section_header(title):
        story.append(Paragraph(title, section_header_style))
        story.append(HRFlowable(width="100%", thickness=0.75, color=line_color, spaceBefore=1, spaceAfter=4))

    # 2. Summary
    add_section_header("Summary")
    summary_text = (
        "Motivated and detail-oriented Computer Science student with practical execution experience spanning "
        "Frontend Web Development and Artificial Intelligence primitives. Adept at building high-performance "
        "Single Page Applications (SPAs) with optimized rendering patterns and clean modern component architecture, "
        "while combining responsive layouts with foundational knowledge in Generative AI architectures and machine learning systems."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 4))

    # 3. Technical Skills
    add_section_header("Technical Skills")
    skills_table_data = [
        [
            Paragraph("<b>Programming Languages:</b>", item_title_style),
            Paragraph("TypeScript, JavaScript (ES6+), Java, Python, C, HTML5, CSS3, SQL", body_style)
        ],
        [
            Paragraph("<b>Libraries & Frameworks:</b>", item_title_style),
            Paragraph("React.js, React Router v6, Vite, Tailwind CSS, Streamlit, NumPy, Pandas", body_style)
        ],
        [
            Paragraph("<b>Tools & Concepts:</b>", item_title_style),
            Paragraph("UI Optimization (useMemo), Responsive Web Design, Generative AI Primitives, NLP, Git & GitHub", body_style)
        ]
    ]
    skills_table = Table(skills_table_data, colWidths=[130, 418])
    skills_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(skills_table)
    story.append(Spacer(1, 4))

    # 4. Projects
    add_section_header("Projects")
    
    # Project 1: Khoje Khatam
    p1_header = [
        Paragraph("<b>Khoje Khatam — B.Tech Academic Resource Platform</b> | <i>React, Vite, React Router v6, CSS3</i>", item_title_style),
        Paragraph("<a href='https://github.com/Harsh927995/web_dev' color='#0284c7'>[GitHub Repository]</a>", item_meta_style)
    ]
    p1_table = Table([p1_header], colWidths=[420, 128])
    p1_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('PADDING', (0,0), (-1,-1), 0)
    ]))
    story.append(p1_table)
    story.append(Paragraph("&bull; Architected a responsive Single Page Application (SPA) using React and Vite to index and serve branch-specific academic metadata, syllabus modules, and PYQs across 5 engineering disciplines.", bullet_style))
    story.append(Paragraph("&bull; Optimized deep data retrieval performance using React <code>useMemo</code> hooks, eliminating redundant calculation layers during real-time multi-branch keyword filtering.", bullet_style))
    story.append(Paragraph("&bull; Engineered flexible state routing utilizing URL query param mappings, allowing instantaneous sharing and persistent bookmarking of pre-filtered application states.", bullet_style))
    story.append(Spacer(1, 3))

    # Project 2: DEV_CORE Portfolio
    p2_header = [
        Paragraph("<b>DEV_CORE — Interactive Engineering Portfolio</b> | <i>React 18, TypeScript, Tailwind CSS, Vite</i>", item_title_style),
        Paragraph("<a href='https://github.com/Harsh927995' color='#0284c7'>[Live Demo / Code]</a>", item_meta_style)
    ]
    p2_table = Table([p2_header], colWidths=[420, 128])
    p2_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('PADDING', (0,0), (-1,-1), 0)
    ]))
    story.append(p2_table)
    story.append(Paragraph("&bull; Designed and deployed a high-performance developer portfolio featuring an interactive in-browser IDE playground simulating live code execution and an integrated CLI terminal modal.", bullet_style))
    story.append(Paragraph("&bull; Engineered modern responsive layouts with strict TypeScript type-safety, achieving 100/100 Lighthouse performance metrics, sub-200ms build times, and fluid cross-device ergonomics.", bullet_style))
    story.append(Spacer(1, 4))

    # 5. Experience
    add_section_header("Experience")

    # Exp 1: Infosys Springboard
    exp1_header = [
        Paragraph("<b>AI & Generative AI Virtual Graduate Intern</b> — Infosys Springboard", item_title_style),
        Paragraph("Remote &bull; May 2024 – June 2024", item_meta_style)
    ]
    exp1_table = Table([exp1_header], colWidths=[380, 168])
    exp1_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('PADDING', (0,0), (-1,-1), 0)
    ]))
    story.append(exp1_table)
    story.append(Paragraph("&bull; Completed an advanced corporate training sequence covering Artificial Intelligence architectures, data preprocessing, and predictive evaluation matrices.", bullet_style))
    story.append(Paragraph("&bull; Mastered foundational Generative AI principles, LLM prompt engineering primitives, and neural framework workflows through standardized professional evaluations.", bullet_style))
    story.append(Spacer(1, 3))

    # Exp 2: Web Development Self-Learner
    exp2_header = [
        Paragraph("<b>Web Development</b> — Self-Learner & Open Source Projects", item_title_style),
        Paragraph("Remote &bull; 2024 – Present", item_meta_style)
    ]
    exp2_table = Table([exp2_header], colWidths=[380, 168])
    exp2_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('PADDING', (0,0), (-1,-1), 0)
    ]))
    story.append(exp2_table)
    story.append(Paragraph("&bull; Learned and applied core HTML5, CSS3, JavaScript, TypeScript, and React concepts by building practical web applications, modules, and responsive user interfaces.", bullet_style))
    story.append(Spacer(1, 4))

    # 6. Education
    add_section_header("Education")
    
    # College
    edu1_header = [
        Paragraph("<b>Chaibasa Engineering College</b> (Jharkhand University of Technology, Ranchi)", item_title_style),
        Paragraph("Sep 2023 – Aug 2027 (Expected)", item_meta_style)
    ]
    edu1_table = Table([edu1_header], colWidths=[380, 168])
    edu1_table.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(edu1_table)
    story.append(Paragraph("<i>Bachelor of Technology (B.Tech) in Computer Science and Engineering</i>", body_style))
    story.append(Paragraph("&bull; Relevant Coursework: Data Structures, Algorithms, Relational Database Management Systems (SQL), Operating Systems, Web Technologies.", bullet_style))
    story.append(Spacer(1, 3))

    # School
    edu2_header = [
        Paragraph("<b>Kendriya Vidyalaya, Godda</b> (Central Board of Secondary Education)", item_title_style),
        Paragraph("Apr 2020 – May 2022", item_meta_style)
    ]
    edu2_table = Table([edu2_header], colWidths=[380, 168])
    edu2_table.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(edu2_table)
    story.append(Paragraph("<i>Intermediate in Science (Physics, Chemistry, Mathematics)</i>", body_style))
    story.append(Spacer(1, 4))

    # 7. Certifications & Achievements
    add_section_header("Certifications & Achievements")
    story.append(Paragraph("&bull; <b>Runner-Up</b> – College Level \"Hack The Web\" Hackathon (Demonstrated rapid frontend prototyping under competitive time limits).", bullet_style))
    story.append(Paragraph("&bull; <b>Web Development Intern</b> – CodSoft Internship Program (Executed responsive client-side web application modules).", bullet_style))
    story.append(Paragraph("&bull; <b>Certified</b> – Artificial Intelligence Primer & Principles of Generative AI (Double Track Credentials, Infosys Springboard).", bullet_style))

    # Build PDF
    doc.build(story)
    print(f"Successfully generated PDF at: {output_path}")

if __name__ == "__main__":
    out_dir = os.path.join(os.path.dirname(__file__), "..", "public")
    os.makedirs(out_dir, exist_ok=True)
    pdf_path = os.path.join(out_dir, "Harsh_Kashyap_Resume.pdf")
    create_resume(pdf_path)

    # Also output to root folder for convenience
    root_path = os.path.join(os.path.dirname(__file__), "..", "..", "Harsh_Kashyap_Resume.pdf")
    create_resume(root_path)
