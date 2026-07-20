import { BookOpen, Clock } from "lucide-react";

const mallaModules = [
  { code: "PSB-101", name: "Proceso de Salud en Bolivia", year: "Primer ano", competences: 4, hours: 80, days: 16 },
  { code: "PAU-102", name: "Primeros Auxilios", year: "Primer ano", competences: 5, hours: 170, days: 34 },
  { code: "ECS-103", name: "Promocion de la Salud", year: "Primer ano", competences: 3, hours: 80, days: 16 },
  { code: "TPB-104", name: "Tecnicas y Procedimientos Basicos en Enfermeria", year: "Primer ano", competences: 5, hours: 300, days: 60 },
  { code: "SSR-105", name: "Salud Sexual y Reproductiva", year: "Primer ano", competences: 6, hours: 280, days: 56 },
  { code: "AIM-106", name: "Atencion al Menor de 5 Anos y Edad Escolar", year: "Primer ano", competences: 4, hours: 290, days: 58 },
  { code: "SAB-201", name: "Saneamiento Basico", year: "Segundo ano", competences: 4, hours: 160, days: 32 },
  { code: "VIG-202", name: "Vigilancia Epidemiologica", year: "Segundo ano", competences: 4, hours: 160, days: 32 },
  { code: "MTR-203", name: "Medicina Tradicional", year: "Segundo ano", competences: 3, hours: 80, days: 16 },
  { code: "IAP-204", name: "Investigacion de Accion Participativa y Operativa", year: "Segundo ano", competences: 3, hours: 160, days: 32 },
  { code: "PPP-205", name: "Practica Pre Profesional en Establecimientos Urbanos y Rurales", year: "Segundo ano", competences: 0, hours: 640, days: null }
];

const competenceLabels = {
  0: "Practica integradora",
  3: "3 competencias",
  4: "4 competencias",
  5: "5 competencias",
  6: "6 competencias"
};

export default function MallaCurricular() {
  const maxHours = Math.max(...mallaModules.map((module) => module.hours));
  const practicalHours = mallaModules.find((module) => module.code === "PPP-205")?.hours ?? 0;

  return (
    <section className="section curriculum-section" id="malla">
      <div className="curriculum-head">
        <div>
          <span className="eyebrow">Plan de estudios</span>
          <h2>Malla curricular</h2>
          <p>Una vista clara del plan de estudios: modulos, competencias, horas academicas y duracion estimada.</p>
        </div>
        <div className="curriculum-total">
          <BookOpen size={22} />
          <strong>2.400 h</strong>
          <span>Carga total</span>
        </div>
      </div>

      <div className="curriculum-table-card">
        <div className="curriculum-table-intro">
          <div>
            <strong>Distribucion academica</strong>
            <span>{practicalHours} horas de practica pre profesional incluidas en el plan.</span>
          </div>
          <Clock size={22} aria-hidden="true" />
        </div>

        <div className="curriculum-table-wrap">
          <table className="curriculum-table">
            <thead>
              <tr>
                <th>Ano</th>
                <th>Codigo</th>
                <th>Modulo</th>
                <th>Competencias</th>
                <th>Horas</th>
                <th>Dias</th>
              </tr>
            </thead>
            <tbody>
              {mallaModules.map((module) => (
                <tr key={module.code}>
                  <td data-label="Ano"><span className="curriculum-year">{module.year}</span></td>
                  <td data-label="Codigo"><span className="curriculum-code">{module.code}</span></td>
                  <td data-label="Modulo">
                    <strong className="curriculum-module-name">{module.name}</strong>
                    <div className="curriculum-progress" aria-hidden="true">
                      <span style={{ width: `${Math.max(10, (module.hours / maxHours) * 100)}%` }} />
                    </div>
                  </td>
                  <td data-label="Competencias">{competenceLabels[module.competences]}</td>
                  <td data-label="Horas"><strong>{module.hours} h</strong></td>
                  <td data-label="Dias">{module.days ? `${module.days} dias` : "Practica intensiva"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
