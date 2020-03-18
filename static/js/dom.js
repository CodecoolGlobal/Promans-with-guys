// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards, dom.loadStatuses);
        });
    },
    showBoards: function (boards, callback) {

        for (let board of boards) {
            const outerHtml = `
            <section class="board">
                <div class="board-header"><span class="board-title">${board.title}</span>
                    <button class="board-add" data-board-id="${board.id}">Add Card</button>
                    <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
                </div>
            <div class="board-columns"  data-id="${board.id}"></div>
            </section>
        `;
            let boardsContainer = document.querySelector('.board-container');
            boardsContainer.insertAdjacentHTML("beforeend", outerHtml);
            document.querySelector("[data-board-id=" + CSS.escape(board.id) + "]").addEventListener('click', dom.createCard);
        }
        callback();
    },
    loadStatuses: function () {
        dataHandler.getStatuses(function (statuses) {
            dom.showStatuses(statuses, dom.loadCards);
        });
    },
    showStatuses: function (statuses, callback) {
        for (let status of statuses) {
            const outerHtml = `
            <div class="board-column">
                <div class="board-column-title">${status.title}</div>
                <div class="board-column-content" data-status-id="${status.id}">
                </div>
            </div>
             `;
            let statusContainerBoard = document.querySelector("[data-id=" + CSS.escape(status.board_id) + "]");
            statusContainerBoard.insertAdjacentHTML("beforeend", outerHtml);
        }
        callback();
    },
    loadCards: function () {
        dataHandler.getCardsByStatusId(function (cards) {
            dom.showCards(cards)
        })
    },
    showCards: function (cards) {
        for (let card of cards) {
            const outerHtml = `
            <div class="card">${card.title}</div>`;
            let cardContainer = document.querySelector("[data-status-id=" + CSS.escape(card.status_id) + "]");
            cardContainer.insertAdjacentHTML("beforeend", outerHtml);
        }
    },
    createCard: function (event) {
        let board_id = this.dataset.boardId;
        let status_id = document.querySelector("[data-id=" + CSS.escape(board_id) + "]").querySelector('.board-column-content').dataset.statusId;
        dataHandler.createNewCard(board_id, status_id, function (cards) {
            dom.showCards(cards)
        })
    }
    // here comes more features
};
