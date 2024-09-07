document.addEventListener('DOMContentLoaded', () => {
    let horarios = JSON.parse(localStorage.getItem('horarios')) || [];
    let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];

    const addHorarioForm = document.getElementById('addHorarioForm');
    const agendarForm = document.getElementById('agendarForm');
    const listaHorarios = document.getElementById('listaHorarios');
    const listaHorariosAdmin = document.getElementById('listaHorariosAdmin');
    const listaAgendamentos = document.getElementById('listaAgendamentos');
    const horarioSelect = document.getElementById('horario');

    const loginForm = document.getElementById('loginForm');
    const loginContainer = document.getElementById('loginContainer');
    const adminContainer = document.getElementById('adminContainer');
    const loginError = document.getElementById('loginError');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === 'tg04009' && password === 'barberadmin') {
                loginContainer.style.display = 'none';
                adminContainer.style.display = 'block';
                atualizarListaHorarios();
                atualizarListaAgendamentos();
            } else {
                loginError.style.display = 'block';
            }
        });
    }

    if (addHorarioForm) {
        addHorarioForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = document.getElementById('data').value;
            const hora = document.getElementById('hora').value;
            const horario = `${data} ${hora}`;
            horarios.push(horario);
            localStorage.setItem('horarios', JSON.stringify(horarios));
            atualizarListaHorarios();
        });
    }

    if (agendarForm) {
        agendarForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.getElementById('nome').value;
            const horario = document.getElementById('horario').value;
            agendamentos.push({ nome, horario });
            localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
            removerHorario(horario);
            atualizarListaAgendamentos();
        });
    }

    function atualizarListaHorarios() {
        if (listaHorarios) {
            listaHorarios.innerHTML = '';
            horarios.forEach(horario => {
                const li = document.createElement('li');
                li.textContent = formatarHorario(horario);
                listaHorarios.appendChild(li);
            });
        }
        if (listaHorariosAdmin) {
            listaHorariosAdmin.innerHTML = '';
            horarios.forEach(horario => {
                const li = document.createElement('li');
                li.textContent = formatarHorario(horario);
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'X';
                deleteButton.classList.add('button', 'delete-button');
                deleteButton.addEventListener('click', () => {
                    removerHorario(horario);
                });
                li.appendChild(deleteButton);
                listaHorariosAdmin.appendChild(li);
            });
        }
        if (horarioSelect) {
            horarioSelect.innerHTML = '';
            horarios.forEach(horario => {
                const option = document.createElement('option');
                option.value = horario;
                option.textContent = formatarHorario(horario);
                horarioSelect.appendChild(option);
            });
        }
    }

    function atualizarListaAgendamentos() {
        if (listaAgendamentos) {
            listaAgendamentos.innerHTML = '';
            agendamentos.forEach(agendamento => {
                const li = document.createElement('li');
                li.textContent = `${agendamento.nome} - ${formatarHorario(agendamento.horario)}`;
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'X';
                deleteButton.classList.add('button', 'delete-button');
                deleteButton.addEventListener('click', () => {
                    removerAgendamento(agendamento);
                });
                li.appendChild(deleteButton);
                listaAgendamentos.appendChild(li);
            });
        }
    }

    function removerHorario(horario) {
        const index = horarios.indexOf(horario);
        if (index > -1) {
            horarios.splice(index, 1);
            localStorage.setItem('horarios', JSON.stringify(horarios));
        }
        atualizarListaHorarios();
    }

    function removerAgendamento(agendamento) {
        const index = agendamentos.findIndex(a => a.nome === agendamento.nome && a.horario === agendamento.horario);
        if (index > -1) {
            agendamentos.splice(index, 1);
            localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
        }
        atualizarListaAgendamentos();
    }

    function formatarHorario(horario) {
        const [data, hora] = horario.split(' ');
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano} às ${hora}`;
    }

    // Inicializar a lista de horários e agendamentos ao carregar a página
    atualizarListaHorarios();
    atualizarListaAgendamentos();
});